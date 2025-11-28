import { json } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import User from "../models/user.js";
import bcrypt, { hash } from 'bcryptjs';


// Todo:  User Registation Function ....

export const register = async (req,res)=>{
    const {name, email, phone, password} = req.body;
    try {

        if(!name || !email || !phone || !password){
    return res.status(400).json({
        success: false ,message : 'Missing Details!'})
    };

    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message : 'Account already axists'})
    };

    const passwordHash = await bcrypt.hash(password , 12);

    const data = {name, email, phone, password : passwordHash};

    const newUser = await User.create(data)
    res.status(201).json({
        success: true, data: newUser, message: 'Account created sucsessfully'});

} catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message})
}};

// Todo : User Login Function




// LOGIN
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Username or Password',
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Tokens
    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    
    user.refreshToken = refreshToken;
    user.refreshTokenExpiresTime = new Date(Date.now() + 7*24*60*60*1000)
    user.lastLogin = new Date()
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      accessToken,
      refreshToken,
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
