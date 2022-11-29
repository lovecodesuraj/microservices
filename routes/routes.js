import dotenv from "dotenv"
dotenv.config();
import express from "express";
import authenticate from "../auth/auth.js";
import JsonPatchUser from "../db/model.js"
const router = express.Router();
import jwt from "jsonwebtoken";
import jsonpatch from "jsonpatch";
import path from "path"
import jimp from "jimp";


const __dirname = path.resolve(path.dirname(''));

router.post("/register", (req, res) => {
  //authenticate user
  const userName = req.body.userName;
  const password = req.body.password;
  JsonPatchUser.findOne({ userName }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user === null) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        const user = new JsonPatchUser({
          UserName: userName,
          password: password,
          accessToken: accessToken,
        });
        user.save();
        res.json({ accessToken: accessToken });
      } else {
        res.json({ "Error": " OOPS ! user with this userName exists already " });
      }
    }
  })

})

router.post("/jsonpatch", authenticate, (req, res) => {
  console.log(req.body)
  const mydoc = req.body.mydoc;
  const thepatch = req.body.thepatch;
  const patcheddoc = jsonpatch.apply_patch(mydoc, thepatch);
  res.json(patcheddoc);
})

router.post("/thumbnail", authenticate, (req, res) => {
  const imageUri = req.body.imageUri;
   
const resize = async ()=>{
 await jimp.read(imageUri)
  .then(lenna => {
    return lenna
      .resize(50, 50) 
      .write('resized.jpg'); // save
  })
  .catch(err => {
    console.error(err);
    res.send("fail")
  });
   
  res.sendFile(__dirname + "/resized.jpg")
}

resize();

 

})

export default router;