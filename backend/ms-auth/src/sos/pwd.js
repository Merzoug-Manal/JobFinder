
const bcrypt = require("bcrypt")

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //cnosole.log(hash);
    return hash;
  } catch (e) {
    console.log(e);
    throw e; // rethrow the error to the calling function
  }
}

async function comparePassword(password, userPwd) {
  try {
    const isMatch = await bcrypt.compare(password, userPwd);
  
    if(!isMatch) throw new Error('invalid email or password')
    return isMatch

    
  } catch (e) {
    console.log(e);
    throw e; // rethrow the error to the calling function
  }
}
 
  module.exports={hashPassword,comparePassword}