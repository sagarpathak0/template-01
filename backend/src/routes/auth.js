const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');

router.post('/signup', async(req,res) =>{
    const {username, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'AAM JAHE MUNDE'});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        user = new User({
            username,
            email,
            password: hashedPassword,
        })
        await user.save()
        const token = jwt.sign({ userId: user._id}, process.env.SECRET_TOKEN, {expiresIn: '1h'});
        console.log('JWT Token generated:',token);
        res.status(201).json({token});
    }catch(err){
        console.log('Error during signup', err.message);
        res.status(500).send("AAM NHI HAI MUNDE")
    }
});

router.post('/login', async(req,res) =>{
    const {email,password} = req.body;
    try {
        console.log('Login Request Body:', req.body);
        
        if(!email || !password){
            console.log('Validation Error: Missing Fields');
            return res.status(400).json({message: 'Missing required fields'});
        }

        const user = await User.findOne({email});
        if(!user){
            console.log("Authentication Error: User not Found");
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign({userId: user._id},process.env.SECRET_TOKEN,{expiresIn: "1h"})
        
        console.log("Login Successful", token); 

        res.status(200).json({token});

    } catch (err) {
        console.log('Error during Login', err.message, err.stack);
        res.status(500).json({message: "Login Error"})
    }

});

module.exports = router;