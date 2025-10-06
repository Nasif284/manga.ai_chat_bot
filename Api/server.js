import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { clerkMiddleware } from "@clerk/express";
import upload from "./Middlewares/multer.js";
import { addChat, getChats, getUserChats, newChatController, removeImage, uploadImage } from "./Controllers/chat.controller.js";
import { connect } from "./Config/dbConnect.js";
import { asyncHandler } from "./Middlewares/asyncHandler.js";
import { errorHandler } from "./Middlewares/globalErrorHandler.js";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRETE_KEY,
  secure: true,
});

const app = express();
await connect()
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(clerkMiddleware());

app.post("/api/chat/new", asyncHandler(newChatController));
app.get("/api/chat/:id", asyncHandler(getChats));
app.patch("/api/chat/:id", asyncHandler(addChat));
app.get("/api/history", asyncHandler(getUserChats));
app.post("/api/image", upload.single("image"), asyncHandler(uploadImage));
app.delete("/api/image/:id", asyncHandler(removeImage));


app.use(errorHandler)
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
