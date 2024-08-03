const jwt = require('jsonwebtoken')
require('dotenv').config();


async function createToken(data) {

    // const payload = {
    //     id: compte.id,
    //     email: compte.email
    // }
    const datee = process.env.JWT_LIFETIME || '1h' ; 
    const secret = process.env.JWT_SECRET ;
    console.log(datee);

    try {
      return jwt.sign({data}, secret,
        {expiresIn: datee,}
    )

      }
       catch (e) { 
        console.log(e)
       }
 }
//  export default {
//   createToken,
// };
module.exports={createToken}