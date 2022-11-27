import dotenv from "dotenv"
dotenv.config();
import express, { Router } from "express";
import authenticate from "../auth/auth.js";
import JsonPatchUser from "../db/model.js"
const router = express.Router();
import jwt from "jsonwebtoken";
import jsonpatch from "jsonpatch";
import axios from "axios";


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
   const imageUri=req.body.imageUri;
  axios(`https://api.imageresizer.io/v1/images?key=${process.env.IMAGE_API_KEY}&url=${imageUri}`,
    {
      method: 'GET'
    }).then(response=> res.send(response)).catch(err=>res.json({"error" :err.message}));
})

export default router;