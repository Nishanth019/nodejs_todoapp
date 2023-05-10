import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from "../utils/features.js";

export const login = async(req,res) => {
    try {
        const {email,password} = req.body;
    const user = await User.findOne({email}).select("+password");
 
    if(!user){
        return res.status(400).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            success:false,
            message:"Invalid Email or Password"
        })
    }
    sendCookie(user,res,`Welcome back, ${user.name}`, 200)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

export const register = async(req,res) => {
    try {
        const {name,email,password} = req.body;
    let user = await User.findOne({email});
    
    if(user) { 
      
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
        
    }
   
    const hashedPassword = await bcrypt.hash(password,10)
    user = await User.create({name,email,password:hashedPassword})
    sendCookie(user,res,"Registered Successfully",201)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

export const getMyProfile = (req,res) => {
    try {
        res.status(200).json({
            success:true,
            message:"Welcome to your profile",
            user:req.user
     })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
    }
}

export const logout = (req,res) => {
     try {
        res.status(200).cookie("token","",{
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure:  process.env.NODE_ENV === "Development" ? "false" : "true" 
        }).json({
            success:true,
            user:req.user,
            message:"logout successfull",
         })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server error"
        })
     }
}

