import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";

import CheckAuth from "./untils/CheckAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://alexchelpek:01082003@cluster0.u9eeurr.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());

app.use(cors());

//автризация
app.post("/auth/login", loginValidation, UserController.login);
//registration
app.post("/auth/register", registerValidation, UserController.register);

//роут на получение информации о себе(проверка можем ли получить информацию о себе)
app.get("/auth/me", CheckAuth, UserController.getMe);

//роуты для статей
app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", CheckAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", CheckAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
