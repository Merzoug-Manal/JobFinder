const jwt = require('jsonwebtoken')
const {  Compte , PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();


// auth for all 
const VerifyIfAuth = async (req, res, next) => {
    try {
      // check header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('no no no');
        return res.status(401).send('Authentication invalid');
      }
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      //console.log(payload);
     // console.log(payload.exp-payload.iat); // time of token to expire
   
      //const currentTime =  Math.floor(Date.now() / 1000);
  
      //console.log(payload.exp-currentTime); // ela hsab current time

      
      const account = await prisma.compte.findUnique({
        where: { email: payload.data },
      });

      if (account && (account.active === true)) {
        // console.log('wddddd');
        return next();
      }
      // console.log('xddd');
      return res.status(401).send('Authentication invalid or account invalid!');
  
  
    } catch (error) {
      console.log(error);
      return res.status(401).send('Authentication invalid or token expired!');
    }
  };
  
  module.exports = VerifyIfAuth