import "./dashbpardInput.css";
import arrow from "../../assets/arrow.png";
import Upload from "../Upload/Upload";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
const DashboardInput = ({ handleInput }) => {
  const [image, setImage] = useState({ file: null, prev: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const text = e.target.prompt.value;
      handleInput(text);
      e.target.prompt.value = "";
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleUpload = (file) => {
    setImage({
      file,
      prev: URL.createObjectURL(file),
    });
  };
  const handleRemove = () => {
    setImage({
      file: null,
      prev: null,
    });
  };
  return (
      <div className="form">
        {image.prev && (
          <div className="preview">
            <div className="imgWrapper">
              <span onClick={handleRemove}>
                <IoIosClose />
              </span>
              <img src={image.prev} alt="" />
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Upload handleUpload={handleUpload} />
          <input name="prompt" type="text" placeholder="Ask me anything" />
          <button type="submit" className="btn">
            <img src={arrow} alt="" />
          </button>
        </form>
      </div>
  );
};

export default DashboardInput;
