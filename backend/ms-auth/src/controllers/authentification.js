const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Compte, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const PasswordHashed = require("../sos/pwd");
const Token = require("../sos/token");
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { StatusCodes } = require("http-status-codes");



passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      try {
        const user = await prisma.compte.findUnique({ where: { email },select: {
          id: true,
          email: true,
          nom: true,
          prenom: true,
          password: true,
          active:true,
          createdAt:true,
          role: true,
          
        } });
        // console.log(user.active);
   
        if ((!user) || (!user.active)) {
          return done(null, false, { message: "Incorrect email or account invalid" });
        }
       
        const isValidPassword = await PasswordHashed.comparePassword(
          password,
          user.password
        );
        // console.log(isValidPassword);
        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } 
      catch (err) {
        return done(err);
      }
    }
  )
);



const login = async (req, res, next) => {
  passport.authenticate("local", async function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: info.message });
    }
    const token = await Token.createToken(user.email);


    return res.status(StatusCodes.OK).json({ user, token });
  })(req, res, next);
};



//update compte
async function updateCompte(req,res) {
  const { id } = req.params;
  const idf = Number(id);
  const data=req.body

  try {
  
    const updatedCompte = await prisma.compte.update({
      where: { id: idf },
      data: { ...data },
    });
    return res.status(200).json({ msg: "Compte updated successfully!" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(StatusCodes.NOT_FOUND).json({  msg:"User not found!" })
    }
    console.error(error);
    return res.status(502).json({ msg: error.message });
  }
  

}


module.exports = { login, updateCompte };
