require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');

const app = express.Router();
app.use(express.json());

app.post('/', async (req,res) => {
    const {picture, name, bio, phone, email, password} = req.body;
    
    try{
        bcrypt.hash(password, 5, async(err, hash) => {
            if (err) {
                res.send({message:'Opps!!! Something went wrong', err});
            } else {
                const user = new UserModel({picture, name, bio, phone, email, password:hash});
                await user.save();
                res.status(201).send({message:'User Registered successfully', user});
            }
        });
    } catch (err) {
        res.status(400).send({message:'Opps!!! Something went wrong',err});
    }
});

app.get('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        let user = await UserModel.findById(id);
        if (user.length>0){
            res.status(200).send({message:'User Found', user});
        } else {
            res.status(400).send({message:'User Not Found'});
        }
    } catch (err) {
        res.status(400).send({message:'Opps!!! Something went wrong',err});
    }
});

module.exports = app;