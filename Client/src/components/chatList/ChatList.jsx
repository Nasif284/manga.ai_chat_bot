import { Link } from "react-router-dom";
import "./chatlist.css";
import RecentChats from "../RecentChats/RecentChats";
const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to={"/dashboard"}>Create a new chat</Link>
      <Link to={"/dashboard"}>Explore Chat Bot Ai</Link>
      <Link to={"/dashboard"}>Contact</Link>
      <hr />
      <RecentChats />
    </div>
  );
};

export default ChatList;
