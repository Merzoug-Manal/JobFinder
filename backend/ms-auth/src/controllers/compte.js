const {  Compte , PrismaClient, Role } = require('@prisma/client');
const prisma = new PrismaClient();
const PasswordHashed= require("../sos/pwd");
const emailSend= require("../sos/emailSend");
const resetPwd= require("../sos/resetPwdEmail");
const Token= require("../sos/token");
const { StatusCodes } = require('http-status-codes')
const { v4: uuidv4 } = require('uuid');
const brokerProducer=require('../config/broker')



//registration admins sous admin
const createAdmin = async (req, res) => {
  try {
    const email= req.body.email
    const nom =req.body.nom
    const prenom =req.body.prenom
    const password= await PasswordHashed.hashPassword(req.body.password)
    const emailExist= await prisma.compte.findUnique({where: {email}})
    if (emailExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "This email already exists" });
    }
    else{
        const admin = await prisma.compte.create({
          data: {
            email,
            password,
            nom,
            prenom,
            role: Role.admin,
            active: true,
          },
        });

    

        //const token = await Token.createToken(email);
        //console.log('token is ' + token);
        return res.status(StatusCodes.CREATED).json({  admin  })
    }
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
 };


//registration demandeur
const createDemandeur = async (req, res) => {
  try {
    const email= req.body.email
    const nom =req.body.nom
    const prenom =req.body.prenom
    const phone =req.body.phone
    const dateNaissance =req.body.dateNaissance
    const placeNaissance =req.body.placeNaissance
    const adresse =req.body.adresse
    const genre =req.body.genre
    const password= await PasswordHashed.hashPassword(req.body.password)
    
    const emailExist= await prisma.compte.findUnique({where: {email}})
    if (emailExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "This email already exists" });
    }
    else{
        const demandeur = await prisma.compte.create({
          data: {
            email,
            password,
            nom,
            prenom,
            role: Role.Demandeur,
            active: false,
          }, 
        });
        // kafka 
        await brokerProducer.sendMessages(
          "creation-demandeur",
          JSON.stringify({
            idDemandeur: demandeur.id,
            nom: nom,
            prenom: prenom,
            email:email,
            genre,
            phone,
            dateNaissance,
            placeNaissance,
            adresse,
          })
        );
        //const token = await Token.createToken(email);
        //console.log('token is ' + token);
        const e= await emailSend.sendEmail(email, nom, prenom)
       //console.log(e);
        return res.status(StatusCodes.CREATED).json({  demandeur  })
    }
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
 };

//confirmation of demandeur/employeur account (active=>true)
const ConfirmDemandeurAndEmployeur = async (req, res) =>{
  try {
    const demandeur= await prisma.compte.update({
        where: 
        {email: req.params.email},
        data:
        {active:true},
      })
      return res.status(StatusCodes.ACCEPTED).json({msg: "Registration confirmed with success"})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
}

//registration employeur
const createEmployeur = async (req, res) => {
  try {
    const email= req.body.email
    const nom =req.body.nom
    const prenom =req.body.prenom
    const entreprise=req.body.entreprise
    const functionEntreprise=req.body.functionEntreprise
    const phone =req.body.phone
    const wilaya=req.body.wilaya
    const adresse =req.body.adresse
    const numeroCommerial= req.body.numeroCommerial

    const password= await PasswordHashed.hashPassword(req.body.password)
    const emailExist= await prisma.compte.findUnique({where: {email}})
    if (emailExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "This email already exists" });
    }
    else{
        const employeur = await prisma.compte.create({
          data: {
            email,
            password,
            nom,
            prenom,
            role: Role.Employeur,
            active: false,
          },
        });
        await brokerProducer.sendMessages(
          "creation-employeur",
          JSON.stringify({
            idEmployeur: employeur.id,
            nom: nom,
            prenom: prenom,
            email:email,
            entreprise,
            functionEntreprise,
            phone,
            wilaya,
            adresse,
            numeroCommerial,
          })
        );
       // const token = await Token.createToken(email);
        //console.log('token is ' + token);
       const e= await emailSend.sendEmail(email, nom, prenom)
       //console.log(e);
        return res.status(StatusCodes.CREATED).json({  employeur  })
    }
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
 };
 //fonctions pour obtenir tous les comptes(utilisateurs)
 const getAllComptes = async (req, res) => {
  try {
    const comptes = await prisma.compte.findMany();
    return res.status(200).json(comptes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};



// forget password and sending mail to reset it
const forgetPassword= async (req, res)=>{
  const { email } = req.body;
  const date=Date.now() + 3600000; 
  try {
    const compte = await prisma.compte.findUnique({ where: { email } });
    if (!compte) {
    return res.status(StatusCodes.NOT_FOUND).send('Email not found');
    }
    const token = uuidv4();
    await prisma.compte.update({
      where: { email: email },
      data: { resetPasswordToken: token, resetPasswordExpires:date,},
    });
    await resetPwd.ResetPwdEmail(email, token)
    return res.status(StatusCodes.OK).json({token})
    
  } 
  catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message });
  }
  

}
//reset pwd
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const compte = await prisma.compte.findUnique({
      where: {
        resetPasswordToken: token,
      },
    });
    
    const date=compte.resetPasswordExpires < Date.now() ;
    console.log(date);

    if ((!compte) && (date) ) {
      return res.status(StatusCodes.NOT_FOUND).send('Invalid reset link or expired');
    }

    const hashedPassword = await PasswordHashed.hashPassword(password);
    console.log(hashedPassword);
    await prisma.compte.update({
      where: 
      {        
        resetPasswordToken: token,
      },
      data: { password: hashedPassword, resetPasswordToken: null, resetPasswordExpires:0,  },
    });
    return res.send('Password reset successful');
  } catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message });
   
  }
};


//********************Admin************************

//get employeur and demandeurs
const getEmployeurOrDemandeur = async (req, res) => {
  try {
    const  role  = req.query.role;
    console.log(role);
    if((role==="Demandeur")||(role==="Employeur")||(role==="admin")){
      const users = await prisma.compte.findMany({ where: { role },
        select: {
          id: true,
          email: true,
          nom: true,
          prenom: true,
          password: true,
          active:true,
          createdAt:true,
          role: true,
          
        },
      });
      return res.status(StatusCodes.OK).json({ users })
    }
    else{
      return res.status(StatusCodes.BAD_GATEWAY).json({ msg: "role not found!"});
    }
   
  
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
 };

//get employeur or demandeur by Id
 const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const idf = Number(id);
    const user= await prisma.compte.findUnique({where: {id: idf},  
    select: {
      id: true,
      email: true,
      nom: true,
      prenom: true,
      password: true,
      active:true,
      createdAt:true,
      role: true,
      
    },})

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({  msg:"user not found!" })
    } 
    return res.status(StatusCodes.OK).json({ user });
  } 
  catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message });
  }
 };

 //desactiver or activer compte (active = false) or (active=true) by admin
 const DesactiverActiverAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const idf = Number(id);
    const { active } = req.body;
    console.log(active);

    const user= await prisma.compte.findUnique({
      where: {id: idf},
    })

    if (user && user.active && !active) {
      await prisma.compte.update({
        where: { id: idf },
        data: { active: active },
      });
      return res.status(StatusCodes.OK).json({ msg: "user deactivated successfully!" });
    } 
    else if (user && !user.active && active) {
      await prisma.compte.update({
        where: { id: idf },
        data: { active: active },
      });
      return res.status(StatusCodes.OK).json({ msg: "user activated successfully!" });
    } 
    else {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found!" });
    }

  } 
  catch (err) {
    console.log(err);
    return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message });
  }
 };


// delete by id employeur or demandeur
 const deleteById = async (req, res) => {
  try {
    const  idf = Number(req.params.id);
    const demandeur= await prisma.compte.findUnique({where: {id: idf}});
   // console.log(Number(idf));
    const user= await prisma.compte.delete({where: {id: idf}})
    console.log(demandeur.email);
    const mail= demandeur.email; 
    const r= demandeur.role;
    
    //kafka delete demandeur
    if (r==Role.Demandeur){
      await brokerProducer.sendMessages(
        "delete-demandeur-by-admin",
        JSON.stringify({
          email: mail,
        })
      );
    }
    //kafka delete employeur
    else if(r==Role.Employeur){
      await brokerProducer.sendMessages(
        "delete-employeur-by-admin",
        JSON.stringify({
          email: mail,
        })
      );
    }
    
   

    return res.status(StatusCodes.OK).json({  msg:"user deleted successfully" })

  } 
  catch (err) {
    if (err.code === 'P2025') {
      return res.status(StatusCodes.NOT_FOUND).json({  msg:"User not found!" })
    }
    console.log(err);
    return res.status(StatusCodes.BAD_GATEWAY).json({ msg: err.message });
  }l
 };
 
module.exports={createAdmin, createDemandeur, ConfirmDemandeurAndEmployeur, createEmployeur, getEmployeurOrDemandeur,
  forgetPassword, resetPassword, getById, deleteById, getAllComptes, DesactiverActiverAccount}
