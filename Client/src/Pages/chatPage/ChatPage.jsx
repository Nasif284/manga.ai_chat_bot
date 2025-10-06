import "./chatPage.css";
import PromptInput from "../../components/newPrompt/PromptInput";
import Markdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getChats } from "../../../Api/api";
import CircularProgress from "@mui/material/CircularProgress";
const ChatPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["chats", id],
    queryFn: () => getChats(id),
  });
  const chatHistory = data?.chats?.map((chat) => ({
    role: chat.role,
    parts: [{ text: chat.text }],
  }));
  if (isLoading) {
    return (
      <div className="loading">
        <CircularProgress color="inherit" />
      </div>
    );
  }
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {data?.chats?.map((chat) =>
            chat.role == "user" ? (
              <>
                {chat.image && (
                  <div className="userChatImage">
                    <div className="chatImageWrapper">
                      <img className="chatImage" src={chat.image} alt="" />
                    </div>
                  </div>
                )}
                <div className="message user">{chat.text}</div>
              </>
            ) : (
              <div className="message">
                <Markdown>{chat.text}</Markdown>
              </div>
            )
          )}
          <PromptInput chatHistory={chatHistory} id={id} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
