import React, { useState } from "react";
const App = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tiklma54");
    data.append("cloud_name", "realback");
    fetch("  https://api.cloudinary.com/v1_1/realback/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>
        <h1>Uploaded image will be displayed here</h1>
        <img src={url} />
      </div>
      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={uploadImage}>Upload</button>
      </div>
    </div>
  );
};
export default App;
