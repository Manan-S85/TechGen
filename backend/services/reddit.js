const axios = require("axios");

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_SECRET = process.env.REDDIT_SECRET;
const USER_AGENT = "TechSite:1.0.0 (by /u/techsite_user)";

// Cache token to avoid repeated requests
let cachedToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    // Check if credentials are available
    if (!REDDIT_CLIENT_ID || !REDDIT_SECRET) {
      throw new Error("Reddit credentials not found in environment variables");
    }

    const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`).toString("base64");
    
    const response = await axios.post(
      "https://www.reddit.com/api/v1/access_token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": USER_AGENT,
        },
        timeout: 10000, // 10 second timeout
      }
    );

    if (response.data.access_token) {
      cachedToken = response.data.access_token;
      // Reddit tokens typically expire in 1 hour, cache for 50 minutes to be safe
      tokenExpiry = Date.now() + (50 * 60 * 1000);
      return cachedToken;
    } else {
      throw new Error("No access token received from Reddit");
    }
  } catch (error) {
    console.error("Reddit Auth Error:", error.response?.data || error.message);
    throw error;
  }
}

async function fetchRedditWithAuth() {
  try {
    const token = await getAccessToken();

    const response = await axios.get(
      "https://oauth.reddit.com/r/technology/hot?limit=10", 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": USER_AGENT,
        },
        timeout: 15000, // 15 second timeout
      }
    );

    if (!response.data?.data?.children) {
      console.warn("Unexpected Reddit API response structure");
      return [];
    }

    return response.data.data.children
      .filter(post => post.data && post.data.title) // Filter out invalid posts
      .map(post => ({
        title: post.data.title,
        url: post.data.url.startsWith('/') ? `https://reddit.com${post.data.url}` : post.data.url,
        source: "Reddit - r/technology",
        publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
        description: post.data.selftext ? post.data.selftext.substring(0, 200) + '...' : '',
        author: post.data.author,
        score: post.data.score,
        category: 'Technology'
      }));

  } catch (error) {
    if (error.response?.status === 403) {
      console.error("Reddit API 403 Error - Check your app credentials and permissions");
    } else if (error.response?.status === 401) {
      console.error("Reddit API 401 Error - Authentication failed, clearing cached token");
      cachedToken = null;
      tokenExpiry = null;
    }
    throw error;
  }
}

async function fetchRedditPublic() {
  try {
    // Fallback to public JSON API with better headers
    const url = "https://www.reddit.com/r/technology/hot.json?limit=10";
    const response = await axios.get(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      timeout: 15000,
    });

    return response.data.data.children.map(post => ({
      title: post.data.title,
      url: post.data.url.startsWith('/') ? `https://reddit.com${post.data.url}` : post.data.url,
      source: "Reddit - r/technology",
      publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
      description: post.data.selftext ? post.data.selftext.substring(0, 200) + '...' : '',
      category: 'Technology'
    }));
  } catch (error) {
    console.error("Reddit Public API Error:", error.message);
    throw error;
  }
}

async function fetchReddit() {
  try {
    // Try OAuth2 first if credentials are available
    if (REDDIT_CLIENT_ID && REDDIT_SECRET) {
      console.log("Using Reddit OAuth2 API");
      return await fetchRedditWithAuth();
    } else {
      console.log("Using Reddit Public API (credentials not configured)");
      return await fetchRedditPublic();
    }
  } catch (error) {
    console.warn("Reddit OAuth2 failed, falling back to public API:", error.message);
    
    try {
      return await fetchRedditPublic();
    } catch (fallbackError) {
      console.error("Both Reddit APIs failed:", fallbackError.message);
      return [];
    }
  }
}

module.exports = { fetchReddit };
