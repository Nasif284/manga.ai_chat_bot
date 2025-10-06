import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  chat: [
    {
      role: {
        type: String,
        enum: ["user", "model"],
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
    },
  ],
});

const chatModel = mongoose.model("chat", chatSchema)
export default chatModel