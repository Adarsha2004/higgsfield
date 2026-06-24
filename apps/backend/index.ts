import express from 'express';
import { CreateAvatarSchema, CreateUserSchema } from './type';
import { prisma } from './db';
import { createImage } from './image';

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const { success, data } = CreateUserSchema.safeParse(req.body);
  if (!success) {
    res.status(403).json({
      message:"Invalid input schema"
    })
    return;
  }

  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: req.body.password
    }
  })


  res.json({
    id:user.id
  })
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/avatar", async (req, res) => {
  const { success, data } = CreateAvatarSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message:"Incorrect inputs"
    })
    return;
  }

  const result = await createImage("Create a side profile of the image given", data.image);


  
})

app.post("/api/v1/video", (req, res) => {

})

app.get("/api/v1/video/:videoId", (req, res) => {

})

app.get("/api/v1/videos", (req, res) => {

})

app.get("/api/v1/me", (req, res) => {

})

app.get("/api/v1/models", (req, res) => {

})

app.get("/api/v1/avatar/:avatarId", (req, res) => {

})

app.get("/api/v1/avatars", (req, res) => {

})

app.listen(3000)