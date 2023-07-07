import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

// Register
export const register = async (req, res) => {
    try{
     const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const check =await User.findOne({email: email});
        if(check) {
            return res.status(400).json({message: "Email already exists"});
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000),
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
     }
     catch(error) {

       console.log(error);
    }
}

export const login = async (req, res) => {
    try{
      const {email, password} = req.body;
      const user = await User.findOne({email:email});
      if(!user) {
          return res.status(404).json({message: "User not found"});
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({
            email: user.email,
            id: user._id,
            // expires in 1 day
        }, process.env.JWT_SECRET, {expiresIn: "1d"});
        delete user.password;
        res.status(200).json({result: user, token})
    } catch(error) {
        console.log(error);
    }
}