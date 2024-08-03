
const jwt = require('jsonwebtoken')
const {  Compte , PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();

//middleware to connect just as an admin (super or sous admin) 
const auth = async (req, res, next) => {
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
      if (account && (account.role === 'admin' || account.role === 'super_admin')) {
        // console.log('yes');
        return next();
      }
      // console.log('no');
      return res.status(401).send('Authentication invalid, connect as Admin');
    } catch (error) {
      console.log('Authentication invalid');
      return res.status(401).send('Authentication invalid');
    }
  };
  

// auth for all 
const VerifyIfAuth = async (req, res, next) => {
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
    return next();

  } catch (error) {
    console.log('Authentication invalid');
    return res.status(401).send('Authentication invalid');
  }
};

module.exports = auth