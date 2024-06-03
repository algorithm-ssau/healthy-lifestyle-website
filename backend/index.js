import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'

import {validationResult} from 'express-validator'
import {registerValidation}from './validations/auth.js'

import UserModel from './models/Users.js'

mongoose.
   connect('mongodb+srv://alexchelpek:01082003@cluster0.u9eeurr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',)
   .then(() => console.log('DB OK'))
   .catch((err) => console.log('DB error',err));

const app=express();
app.use(express.json());



app.post('/auth/register',registerValidation,(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json(errors.array());
    }
 
    //const password=req.body.password;
    //const salt= await bcrypt.genSalt(10);
 
 
 
    const doc =new UserModel({
     email:req.body.email,
     fullName:req.body.fullName,
     avatarUrl:req.body.avatarUrl,
     passwordHash:req.body.avatarUrl,
    });
    
    res.json({
     succes:true,
    })
     
  });
    


app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
    });