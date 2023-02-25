require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../Models/user.model');

const app = express.Router();
app.use(express.json());

app.post('/', async (req,res) => {
    const {email, password} = req.body;
    
    try{
        const user = await UserModel.find({email});
        if (user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({name:user[0].name, id:user[0]._id}, process.env.secret);
                    res.setHeader('Authorization', token);
                    res.status(201).send({message:'Login Successful', token});
                } else {
                    res.status(400).send({message:'Login Failed', err});
                }
            })
        }
    } catch (err) {
        res.status(400).send({message:'Login Failed',err});
    }
});

module.exports = app;