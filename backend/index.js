import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose'

import {registerValidation, loginValidation, postCreateValidation}from './validations.js'

import CheckAuth from './untils/CheckAuth.js'

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';

mongoose.
   connect('mongodb+srv://alexchelpek:01082003@cluster0.u9eeurr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',)
   .then(() => console.log('DB OK'))
   .catch((err) => console.log('DB error',err));

const app=express();

//хранилище для сохранения картинок
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
     
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({ storage });


app.use(express.json());
app.use('/uploads', express.static('uploads'));


//автризация
app.post('/auth/login',loginValidation, UserController.login);
//registration
app.post('/auth/register',registerValidation,UserController.register);
//роут на получение информации о себе(проверка можем ли получить информацию о себе)
app.get('/auth/me',CheckAuth, UserController.getMe);

//
app.post('/upload',CheckAuth,upload.single('image'), (req, res) => {
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });


//роуты для статей
app.get('/posts', PostController.getAll);
app.get('/posts/:id',PostController.getOne);
app.post('/posts',CheckAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id',CheckAuth, PostController.remove);
app.patch('/posts/:id',PostController.update);


app.listen(4444,(err)=>
    {
        if(err){
            return console.log(err);
        }
        console.log('Server OK');
});
    