import { DecodeToken } from "../utility/TokenHelper.js";

export default (req, res, next) => {
    // Receive Token
      let token = req.headers['token'] || req.cookies['token'];
      console.log("token", token)
    if(!token){
      try {
        let token =req.cookies['token']
        return res.status(401).json({status:"success"})
      } catch (error) {
        return res.status(500).json({status:"fail token",message:error.message})
      }
 
    }
  // Token Decode
  let decoded=DecodeToken(token)


  // Request Header Email+UserID Add
  if(decoded===null){
      return res.status(401).json({status:"fail decode", message:"Unauthorized"})
  }
  else {
    let email=decoded['email'];
    let user_id=decoded['user_id'];
    req.headers.email=email;
    req.headers.user_id=user_id;
    next();
  }
};
