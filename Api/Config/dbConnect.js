import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URi);
    console.log("db connected");
  } catch (err) {
    console.log(err.message);
  }
};
