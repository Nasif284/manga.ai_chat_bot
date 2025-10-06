import { getAuth } from "@clerk/express";
import chatModel from "../models/chat.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import userChatsModel from "../models/userChats.model.js";
const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: false,
  folder: "chat-bot",
};
export const newChatController = async (req, res) => {
  const { userId } = getAuth(req);
  const { text, image } = req.body;

  let obj = {};
  if (image) {
    obj = { role: "user", text: text, img: image };
  } else {
    obj = { role: "user", text: text };
  }
  const newChat = await chatModel.create({
    userid: userId,
    chat: [obj],
  });

  const userChat = await userChatsModel.findOne({ userId });
  if (userChat) {
    await userChatsModel.updateOne({ userId }, { $push: { chats: { chat_id: newChat._id, title: text.slice(0, 40) } } });
  } else {
    await userChatsModel.create({
      userId,
      chats: [
        {
          chat_id: newChat._id,
          title: text.slice(0, 40),
        },
      ],
    });
  }
  res.status(200).json({
    success: true,
    error: false,
    id: newChat._id,
    message: "Chat saved",
  });
};
export const addChat = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  await chatModel.findByIdAndUpdate(id, { $push: { chat: { $each: body } } });
  return res.status(200).json({ success: true, error: false });
};
export const getChats = async (req, res) => {
  const id = req.params.id;
  const chats = await chatModel.findById(id);
  return res.status(200).json({ chats: chats.chat });
};

export const getUserChats = async (req, res) => {
  const { userId } = getAuth(req);
  const userChats = await userChatsModel.findOne({ userId });
  return res.status(200).json({ userChats });
};

export const uploadImage = async (req, res) => {
  const image = req.file;
  const result = await cloudinary.uploader.upload(image?.path, options);
  fs.unlinkSync(image?.path);
  res.status(200).json({ url: result.secure_url, public_id: result.public_id });
};

export const removeImage = async (req, res) => {
    const public_id = req.params.id
    await cloudinary.uploader.destroy("chat-bot/"+public_id)
    res.status(200).json({success:true})
}