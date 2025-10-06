import React from "react";
import { getUserChats } from "../../../Api/api";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
const RecentChats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["userChats"],
    queryFn: getUserChats,
  });
  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <div className="list">
      <span className="title">RECENT CHATS</span>
      {data?.userChats?.chats?.map((chat) => (
        <Link to={`/chat/${chat.chat_id}`}>{chat.title}</Link>
      ))}
    </div>
  );
};

export default RecentChats;
