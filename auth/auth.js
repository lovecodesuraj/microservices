
import JsonPatchUser from "../db/model.js"
import jwt from "jsonwebtoken"

const authenticate = (req, res, next) => {
    console.log(req.headers)
    const accessToken =req.headers.accesstoken;
    if (accessToken == null) return res.sendStatus(401)
    JsonPatchUser.findOne({accessToken},(err,user)=>{
      if(err){
        console.log(err);
      }
      else{
        if(user==null){
          res.json({"error":"Invalid accesstoken !!!"})
        }else{
            next()  
        }
      }
   
    })
   
  }

  export default authenticate;