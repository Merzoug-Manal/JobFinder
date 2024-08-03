const natural = require('natural');
const stopword = require('stopword');
const jobs=require('./sos/dataset');


const tokenizer = new natural.WordTokenizer();

function preprocessText(text) {
    const txt = text.toLowerCase();
    return txt;
  }

  function calculateCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, value, index) => sum + value * vec2[index], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, value) => sum + value * value, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, value) => sum + value * value, 0));
  
    if (magnitude1 === 0 || magnitude2 === 0) {
        
      return 0; 
    }
    
    return dotProduct / (magnitude1 * magnitude2);
  }
  
  function recommendJobs(userSkills, numRecommendations) {
    const userSkillSet = new Set(userSkills.map(skill => preprocessText(skill)));
  // console.log('hhhhhhhhhhhh');
  // console.log(userSkillSet);

    const jobScores = jobs.map(job => {
      const jobSkillSet = new Set(job.skills.map(skill => preprocessText(skill)));
     // console.log('lllllllllllllllllllllll');
      // console.log(jobSkillSet);
      const allSkills = [...new Set([...userSkillSet, ...jobSkillSet])];
  
      const userVector = allSkills.map(skill => (userSkillSet.has(skill) ? 1 : 0));
      const jobVector = allSkills.map(skill => (jobSkillSet.has(skill) ? 1 : 0));
     
      const similarity = calculateCosineSimilarity(userVector, jobVector);
  
      return { job, similarity };
    });
  
    jobScores.sort((a, b) => b.similarity - a.similarity);
    console.log(jobScores);
    const recommendations = jobScores
    .slice(0, numRecommendations)
    .filter(item => item.similarity >= 0.2) 
    .map(item => item.job.title);
  
  return recommendations;
  }
  

module.exports = {
  recommendJobs
};


