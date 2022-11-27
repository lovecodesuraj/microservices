import mongoose from "mongoose";
const userSchema=mongoose.Schema({
  userName:String,
  password:String,
  accessToken:String,
})
const JsonPatchUser = mongoose.model('JsonPatchUser', userSchema);
export default JsonPatchUser;