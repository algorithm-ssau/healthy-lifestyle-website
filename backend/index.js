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

//автризация
app.post('/auth/login',async(req,res)=> {
    try{
        const user=await UserModel.findOne({email:req.body.email});
        if(!user){
            return res.status(404).json({
                message:'Пользователь не найден',
            });
        }
        const isValidPass=await bcrypt.compare(req.body.password,user._doc.passwordHash);

        if(!isValidPass){
            return res.status(400).json({
                message:'Неверный логин или пароль',
            });

        }
        const token =jwt.sign(
            {
            _id:user._id,   
            },
        'secret123',
           {             
             expiresIn:'30d',
    
           },
        );

        const { passwordHash,...userData}=user._doc;

    
    res.json({
        ...userData,
        token,
    });

    }catch(err){

        console.log(err);
        res.status(500).json({message:'Не удалось авторизоваться',

        });
    }
})
//registration
app.post('/auth/register',registerValidation,async(req,res)=>{
    try{
        const errors=validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json(errors.array());
    }
 
    const password=req.body.password;
    const salt= await bcrypt.genSalt(10);
    //в этой перменной будет храниться зашифрованный пароль(переменная passwordHash)
    const hash=await bcrypt.hash(password,salt);
 
 
 
    const doc =new UserModel({
     email:req.body.email,
     fullName:req.body.fullName,
     avatarUrl:req.body.avatarUrl,
     passwordHash:hash,
    });


    //создаем пользователя в mongodb сохраняем его в документ
    const user =await doc.save();


    //id пользователя достаточно для проверок пользователя
    //шифруем id
    const token =jwt.sign({
        _id:user._id,

    },'secret123',
       {
         //срок хранения токена (перестанит быть валидным через 30 дней)
         expiresIn:'30d',

       }
    );
    const { passwordHash,...userData}=user._doc;

    //важно что два res.json(user); нельзя возвращать express будет ругаться
    res.json({
        ...userData,
        token,
    });

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Не удалось зарегестрироваться',

        });
    }
     
  });
   
  //роут на получение информации о себе
  app.get('/auth/me',(req,res)=>{
    try{}
    catch(err){
        
    }
  })


app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
    });