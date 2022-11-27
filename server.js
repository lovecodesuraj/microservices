import dotenv from "dotenv"
dotenv.config()
import express from "express";
import router from "./routes/routes.js";
import connectToDb from "./db/db.js";


connectToDb();
const app = express();
app.use(express.json());
app.use("/home",router)



app.listen(3000, () => {
  console.log("server is running at port 3000")
})