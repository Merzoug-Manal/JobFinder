const jwt = require('jsonwebtoken')
const {  Compte , PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();


// auth for all 
const superAdminAuth = async (req, res, next) => {
    try {
      // check header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Authentication invalid');
        return res.status(401).send('Authentication invalid');
      }
      const token = authHeader.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const account = await prisma.compte.findUnique({
        where: { email: payload.data },
      });
      if (account && (account.role === 'super_admin')) {
        // console.log('wddddd');
        return next();
      }
      // console.log('xddd');
      return res.status(401).send('Authentication invalid, please connect as super admin');
  
  
    } catch (error) {
      console.log('Authentication invalid');
      return res.status(401).send('Authentication invalid');
    }
  };
  
  module.exports = superAdminAuth