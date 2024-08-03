const express=require('express')
const router = express.Router()
const { recommendJobs }=require('./model'); 


router.post('/recommended-jobs/:numRecommendations', (req, res) => {
  //console.log(req.query);
    console.log(req.body);
    const  userSkills  = req.body.userSkills;
    const nbRecommendation=req.params.numRecommendations;
    
   
    const recommendations = recommendJobs(userSkills, nbRecommendation);
  
    res.json(recommendations);
  });
  
module.exports = router;
  