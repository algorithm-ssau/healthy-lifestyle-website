import express from 'express';

import mongoose from 'mongoose'


import {registerValidation}from './validations/auth.js'


import CheckAuth from './untils/CheckAuth.js'

import * as UserController from './controllers/UserController.js';

mongoose.
   connect('mongodb+srv://alexchelpek:01082003@cluster0.u9eeurr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',)
   .then(() => console.log('DB OK'))
   .catch((err) => console.log('DB error',err));

const app=express();
app.use(express.json());

//автризация
app.post('/auth/login',UserController.login);
//registration
app.post('/auth/register',registerValidation,UserController.register);
   
  //роут на получение информации о себе(проверка можем ли получить информацию о себе)
  app.get('/auth/me',CheckAuth,UserController.getMe);


app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
    });