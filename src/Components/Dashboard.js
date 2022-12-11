import React, { useState } from "react";
import "./DashBoard.css";
import axios from 'axios';




const Dashboard = () => {
  const [output, setoutput] = useState("");
  const [inputImage, setinputImage] = useState("");



    // a local state to store the currently selected file.
    // const [selectedFile, setSelectedFile] = React.useState(null);
  
    const handleSubmitImage =async (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", inputImage);
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/convert/image",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(response);
        setoutput(response.data)
      } catch(error) {
        console.log(error)
      }
    }
    const handleSubmitPDF =async (event) => {
      event.preventDefault()
      const formData = new FormData();
      formData.append("selectedFile", inputImage);
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/convert/pdf",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(response);
        setoutput(response.data.text)
      } catch(error) {
        console.log(error)
      }
    }


    const handleChange=(event)=>{
        // console.log(event);
        setinputImage(event)
          // console.log(inputImage)
    }




  return (
    <div className="container">
      <div className="titles">
        <h1>Welcome To text converter</h1>
        <h3> Convert your image,XL sheet or PDF into text here</h3>
      </div>
      <h2>Select file to convert into text</h2>
      <div className="uploading-area">
        <div>
          <label className="inputs">select image</label>
          <input accept="image/jpeg,image/jpg,image/png" className="inputs" onChange={(e)=>handleChange(e.target.files[0])} type="file" placeholder="upload image" />
          <button className="inputs" onClick={handleSubmitImage}>Upload</button>
        </div>

        <div>
          <label className="inputs">select pdf</label>
          <input accept=".pdf" onChange={(e)=>handleChange(e.target.files[0])} className="inputs" type="file" placeholder="upload image" />
          <button onClick={handleSubmitPDF}  className="inputs">Upload</button>
        </div>
        <div>
          <label className="inputs">enter url of Xl file</label>
          <input
            className="inputs"
            type="text"
            placeholder="link of xl file "
          />
          <button className="inputs">Upload</button>
        </div>
      </div>
      <textarea
        value={output}
        placeholder="upload file to get output"
        className="output"
        type="text"
        rows="7"
        cols="60"
      ></textarea>
    </div>
  );
};

export default Dashboard;
