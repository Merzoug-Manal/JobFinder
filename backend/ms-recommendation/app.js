const express = require('express');
const cors = require('cors');
const app = express();
const route=require('./route');
const bodyParser = require('body-parser');

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'], 
  allowedHeaders: ['*'], 
}));

app.use(bodyParser.json());
app.use('/api',route)
// const { recommendJobs }=require('./model');

// const userSkills = ['Software_engineering', 'Problem_solving', 'Web_development', 'Design'];
// const numRecommendations = 12;
// const recommendedJobs = recommendJobs(userSkills, numRecommendations);
// console.log(recommendedJobs);


app.listen(8088, () => {
  console.log('Server started on port 8088');
});
