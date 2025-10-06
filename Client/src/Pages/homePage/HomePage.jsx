import React, { useState } from "react";
import "./homePage.css";
import orbital from "../../assets/orbital.png";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import bot from "../../assets/bot.png";
import human from "../../assets/human1.jpeg";
const HomePage = () => {
  const [isBot, setIsBot] = useState(false);
  return (
    <div className="homePage">
      <div className="left">
        <img className="orbit" src={orbital} alt="" />
        <h1>Ai Chat Bot</h1>
        <h3>Supercharge your productivity and creativity with Ai Chat Bot</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium aperiam quod omnis asperiores possimus officiis dicta itaque voluptate nam odit optio, ex minus, aliquam modi quisquam est eligendi.</p>
        <Link to={"/dashboard" }>Get Started</Link>
        <div className="chat">
          <div className="imgWrapper">
            <img src={isBot ? bot : human} alt="" />
          </div>
          <TypeAnimation
            sequence={[
              "What is the weather today?",
              1000,
              () => {
                setIsBot(true);
              },
              "It's a typical monsoon day here with pleasant temperatures around 25°C.",
              1000,
              () => {
                setIsBot(false);
              },
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "2em" }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
