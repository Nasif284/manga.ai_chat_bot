import "./promptInput.css";
import arrow from "../../assets/arrow.png";
import Upload from "../Upload/Upload";
import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import getAiChat from "../../../utils/responseGeneration";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addChats, AddImage, removeImg } from "../../../Api/api";
import CircularProgress from "@mui/material/CircularProgress";
const PromptInput = ({ chatHistory, id }) => {
  const [image, setImage] = useState({ isLoading: false, public_id: null, prev: null, aiData: null, url:null });
  const [prompt, setPrompt] = useState({ text: "", image: "" });
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const queryClient = useQueryClient();
  const imageAdd = useMutation({
    mutationFn: AddImage,
    onSuccess: (res) => {
      setImage((prev) => ({
        ...prev,
        public_id: res.public_id,
        isLoading: false,
        prev: res.url,
        url: res.url
      }));
    },
  });
  const removeImage = useMutation({
    mutationFn: removeImg,
  });
  const { mutate } = useMutation({
    mutationFn: addChats,
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
      setAnswer("");
      setPrompt("");
      setImage({ isLoading: false, public_id: null, prev: null, aiData: null });
    },
  });
  const ref = useRef();
  const chat = getAiChat(chatHistory);
  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [answer, prompt]);
  const streamOutput = async (text, imageUrl) => {
    setIsLoaded(false);
    const stream1 = await chat.sendMessageStream({
      message: image.aiData ? [image.aiData, text] : text,
    });
    let answerAcc = "";
    setIsLoading(false);
    for await (const chunk of stream1) {
      answerAcc += chunk.text;
      setAnswer(answerAcc);
    }
    setIsLoaded(true);
    let updated = [{ role: "model", text: answerAcc }];
    if (chatHistory?.length != 1) {
      let obj = { role: "user", text: text };
      if (imageUrl) {
        obj.image = imageUrl;
      }
      updated.unshift(obj);
    }
    mutate({
      id,
      data: updated,
    });
  };
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (chatHistory?.length == 1) {
        setIsLoading(true);
        streamOutput(chatHistory[0]?.parts[0]?.text);
      }
    }
    hasRun.current = true;
  }, [chatHistory]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setImage((prev)=> ({...prev,prev:null}))
      const text = e.target.prompt.value;
      e.target.prompt.value = "";
      const updated = { text };
      if (image.url) {
        updated.image = image.url;
      }
      setPrompt(updated);
      if (image.url) {
        await streamOutput(text, image.url);
      } else {
        await streamOutput(text);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    imageAdd.mutate(formData);
    setImage((prev) => ({
      ...prev,
      isLoading: true,
      prev: URL.createObjectURL(file),
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage((prev) => ({
        ...prev,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };
  const handleRemove = () => {
    const id = image.public_id.split("/")[1];
    removeImage.mutate(id);
    setImage({ public_id: null, url: null, isLoading: false, prev: null });
  };
  return (
    <>
      {prompt.image && (
        <div className="userChatImage">
          <div className="chatImageWrapper">
            <img className="chatImage" src={prompt.image} alt="" />
          </div>
        </div>
      )}

      {prompt.text && <div className="message user">{prompt.text}</div>}
      {isLoading && <div className="message">...</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="end" ref={ref}>
        "
      </div>
      <div className="form">
        {image.prev && (
          <div className="preview ">
            {image.isLoading ? (
              <div className="imgWrapper loading">
                <div className="overlay">
                  <div>
                    <CircularProgress color="inherit" size={20} />
                  </div>
                </div>
                <img src={image.prev} alt="" />
              </div>
            ) : (
              <>
                <span className="close" onClick={handleRemove}>
                  <IoIosClose />
                </span>
                <div className="imgWrapper">
                  <img src={image.prev} alt="" />
                </div>
              </>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Upload handleUpload={handleUpload} />
          <input name="prompt" type="text" placeholder="Ask me anything" />
          <button disabled={!isLoaded || image.isLoading} type="submit" className="btn">
            {isLoaded ? <img src={arrow} alt="" /> : <CircularProgress color="inherit" size={20} />}
          </button>
        </form>
      </div>
    </>
  );
};

export default PromptInput;
