import mongoose from "mongoose";

//Created schema

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic:{
        type: String,
        default: "",
    }
});

//Created model

const User = mongoose.model("User", userSchema);


export default User;

