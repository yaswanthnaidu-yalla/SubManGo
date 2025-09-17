import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { 
     type: String,
     required :[ true,'username is required' ] , 
     unique: true , 
     trim : true, minlength : 2, maxlength : 30 },
  email: {
     type: String,
     required: [true,'Email is required'], 
     unique: true , 
     trim : true, 
     lowercase : true, 
     minlength : 5, 
     maxlength : 50 , 
     match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'] },
  password: { 
    type: String, 
    required: true },
  createdAt: { 
    type: Date, 
    default: Date.now },
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;