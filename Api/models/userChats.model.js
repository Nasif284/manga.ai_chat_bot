import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        chat_id: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const userChatsModel = mongoose.model("userChats", userChatsSchema)
export default userChatsModel