import chat from "../../assets/chat.png";
import image from "../../assets/image.png";
import code from "../../assets/code.png";
import "./dashboard.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewChat } from "../../../Api/api";
import { useNavigate } from "react-router-dom";
import DashboardInput from "../../components/DashInput/DahsboardInput";
import mango from "../../assets/mango.png";
const Dashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNewChat,
    onSuccess: (res) => {
      navigate(`/chat/${res.id}`);
      queryClient.invalidateQueries(["userChats"]);
    },
  });
  const handleInput = (text) => {
    mutate({ text });
  };
  return (
    <div className="dashboard">
      <div className="texts">
        <div className="logo">
          <img className="logoImg" src={mango} alt="" />
          <h1 className="title">Manga.ai</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src={chat} alt="" />
            <span>Create new chat</span>
          </div>
          <div className="option">
            <img src={image} alt="" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src={code} alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <DashboardInput handleInput={handleInput} />
    </div>
  );
};

export default Dashboard;
