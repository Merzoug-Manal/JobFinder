const express=require('express')
const verifyauth = require('../middleware/VerifyAuth')
const SuperAdminAuth = require('../middleware/SuperAdminAuth')
const router = express.Router()



const {createAdmin, createDemandeur, ConfirmDemandeurAndEmployeur, createEmployeur, forgetPassword, resetPassword, getAllComptes}= require('../controllers/compte')
const {updateCompte, login}=require('../controllers/authentification')


// router.route('/register/admin').post(createAdmin)
router.post('/register/admin', SuperAdminAuth,createAdmin )
router.route('/register/demandeur').post(createDemandeur)
router.route('/register/employeur').post(createEmployeur)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/confirm/:email').get(ConfirmDemandeurAndEmployeur)
router.route('/comptes').get(getAllComptes);
router.route('/login').post(login);
//router.route('/update/:id').put(updateCompte, auth);
router.put('/update/:id',verifyauth, updateCompte)





module.exports= router