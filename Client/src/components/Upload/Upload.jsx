import attachment from "../../assets/attachment.png";

const Upload = ({ handleUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUpload(file); 
  };
  return (
    <>
      <div className="btn">
        <input type="file" onChange={handleFileChange} />
        <img src={attachment} alt="" />
      </div>
      <br />
    </>
  );
};

export default Upload;
