import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'

import {validationResult} from 'express-validator'
import {registerValidation}from './validations/auth.js'

import UserModel from './models/Users.js'

mongoose.
   connect('mongodb+srv://alexchelpek:01082003@cluster0.u9eeurr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',)
   .then(() => console.log('DB OK'))
   .catch((err) => console.log('DB error',err));

const app=express();
app.use(express.json());



app.post('/auth/register',registerValidation,async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json(errors.array());
    }
 
    const password=req.body.password;
    const salt= await bcrypt.genSalt(10);
    //в этой перменной будет храниться зашифрованный пароль(переменная passwordHash)
    const passwordHash=await bcrypt.hash(password,salt);
 
 
 
    const doc =new UserModel({
     email:req.body.email,
     fullName:req.body.fullName,
     avatarUrl:req.body.avatarUrl,
     passwordHash,
    });


    //создаем пользователя в mongodb сохраняем его в документ
    const user =await doc.save();

    res.json(user);
     
  });
    


app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
    });