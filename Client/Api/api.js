import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URI + "/api",
  withCredentials: true,
});

export const addNewChat = async (data) => {
  try {
    const res = await api.post("/chat/new", data);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getChats = async (id) => {
  try {
    const res = await api.get(`/chat/${id}`);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const addChats = async ({ id, data }) => {
  try {
    await api.patch(`/chat/${id}`, data);
  } catch (err) {
    console.log(err.message);
  }
};

export const getUserChats = async () => {
  try {
    const res = await api.get("/history");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const AddImage = async (data) => {
  try {
    const res = await api.post("/image", data);
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const removeImg = async (id) => {
  try {
    await api.delete(`/image/${id}`);
  } catch (err) {
    console.log(err.message);
  }
};
