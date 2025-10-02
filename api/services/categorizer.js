// Smart categorization service
const techKeywords = [
  'AI', 'artificial intelligence', 'machine learning', 'ML', 'deep learning',
  'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'NFT',
  'software', 'programming', 'code', 'developer', 'API',
  'cloud computing', 'AWS', 'Azure', 'Google Cloud',
  'cybersecurity', 'hacking', 'data breach', 'privacy',
  'smartphone', 'iPhone', 'Android', 'app', 'mobile',
  'internet', 'web', 'website', 'browser', 'Chrome', 'Firefox',
  'tech', 'technology', 'digital', 'online', 'virtual',
  'startup', 'Silicon Valley', 'venture capital', 'IPO',
  'Tesla', 'SpaceX', 'Apple', 'Google', 'Microsoft', 'Meta', 'Facebook',
  'chip', 'processor', 'semiconductor', 'Intel', 'AMD', 'NVIDIA',
  'VR', 'virtual reality', 'AR', 'augmented reality', 'metaverse',
  '5G', 'IoT', 'internet of things', 'smart home', 'automation',
  'quantum computing', 'robotics', 'drone', 'autonomous',
  'electric vehicle', 'EV', 'battery', 'renewable energy',
  'streaming', 'Netflix', 'YouTube', 'gaming', 'esports'
];

const generalNewsKeywords = [
  'politics', 'government', 'president', 'election', 'congress', 'senate',
  'economy', 'market', 'stocks', 'inflation', 'GDP', 'unemployment',
  'health', 'medical', 'hospital', 'doctor', 'disease', 'vaccine',
  'sports', 'football', 'basketball', 'soccer', 'olympics', 'championship',
  'entertainment', 'movie', 'film', 'actor', 'actress', 'celebrity',
  'weather', 'climate', 'hurricane', 'earthquake', 'disaster',
  'crime', 'police', 'court', 'arrest', 'investigation',
  'education', 'school', 'university', 'college', 'graduation',
  'travel', 'tourism', 'vacation', 'airline', 'hotel'
];

const studentKeywords = [
  'student', 'students', 'university', 'college', 'campus', 'education',
  'degree', 'graduation', 'scholarship', 'tuition', 'academic',
  'research', 'thesis', 'dissertation', 'professor', 'lecturer',
  'exam', 'examination', 'study', 'learning', 'course',
  'internship', 'career', 'job placement', 'employment',
  'STEM', 'engineering', 'computer science', 'programming course',
  'online learning', 'e-learning', 'remote education',
  'student loan', 'financial aid', 'dormitory', 'hostel',
  'extracurricular', 'club', 'society', 'competition',
  'coding bootcamp', 'certification', 'skills development'
];

function categorizeNews(title, description) {
  const content = `${title} ${description}`.toLowerCase();
  
  // Count keyword matches for each category
  const techScore = techKeywords.reduce((score, keyword) => {
    return score + (content.includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);
  
  const generalScore = generalNewsKeywords.reduce((score, keyword) => {
    return score + (content.includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);
  
  const studentScore = studentKeywords.reduce((score, keyword) => {
    return score + (content.includes(keyword.toLowerCase()) ? 1 : 0);
  }, 0);
  
  // Determine category based on highest score
  if (studentScore > 0 && studentScore >= techScore && studentScore >= generalScore) {
    return 'Student';
  } else if (techScore > generalScore && techScore > 0) {
    return 'Technology';
  } else if (generalScore > 0) {
    return 'General';
  } else {
    // Fallback: if no strong indicators, classify based on source
    return 'General';
  }
}

function isRelevantToStudents(title, description) {
  const content = `${title} ${description}`.toLowerCase();
  return studentKeywords.some(keyword => content.includes(keyword.toLowerCase()));
}

module.exports = { categorizeNews, isRelevantToStudents };