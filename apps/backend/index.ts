import express from 'express';
import { CreateAvatarSchema, CreateUserSchema } from './type';
import { prisma } from './db';
import { createImage } from './image';
import { uuid } from 'uuidv4';
import { generateVideo } from './video';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

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

  const leftProfileId = uuid();
  const rightProfileId = uuid();
  const frontProfileId = uuid();


  await createImage("Create a side profile for the user for the left side. It should be high quality portfolio shoot type photo", data.image, `./assets/${leftProfileId}.png`);
  await createImage("Create a side profile for the user for the right side. It should be high quality portfolio shoot type photo", data.image, `./assets/${rightProfileId}.png`);
  await createImage("Create a front profile for the user. It should be high quality portfolio shoot type photo", data.image, `./assets/${frontProfileId}.png`);

  //put in s3 and then in db
  res.json({})
  
})

app.post("/api/v1/video", async (req, res) => {
  await generateVideo("The video opens with a medium, eye-level shot of a beautiful man with dark hair and warm brown eyes. She wears a magnificent, high-fashion flamingo dress with layers of pink and fuchsia feathers, complemented by whimsical pink, heart-shaped sunglasses. She walks with serene confidence through the crystal-clear, shallow turquoise water of a sun-drenched lagoon. The camera slowly pulls back to a medium-wide shot, revealing the breathtaking scene as the dress's long train glides and floats gracefully on the water's surface behind her. The cinematic, dreamlike atmosphere is enhanced by the vibrant colors of the dress against the serene, minimalist landscape, capturing a moment of pure elegance and high-fashion fantasy.",
    ["https://github.com/Adarsha2004/higgsfield/blob/main/apps/backend/assets/81effaaa-035f-4434-95f9-ea35c440c762.png?raw=true",
      "https://github.com/Adarsha2004/higgsfield/blob/main/apps/backend/assets/8884d8d1-96e1-4c45-81bc-79fe3b8d7511.png?raw=true",
      "https://github.com/Adarsha2004/higgsfield/blob/main/apps/backend/assets/e21f905c-e42b-4995-82b9-1be8b38b39c6.png?raw=true"
    ],
    "./assets/video.mp4"
  )

  res.json({});
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