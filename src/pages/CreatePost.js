import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../context/Context";

import "./CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const createPostHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="CreatePost">
        {file && (
          <img
            src={URL.createObjectURL(file)}
            className="formImg"
            alt="createPost"
          />
        )}
        <form className="formPost" onSubmit={createPostHandler}>
          <div className="formGroup">
            <label htmlFor="fileInput">
              <i className=" cIcone fa-solid fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              className="writeInput"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <textarea
              placeholder="Tell your Journy..."
              type="text"
              className="writeInput wirteText"
              cols="60"
              rows="10"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <button className="wirteSubmit" type="submit">
            Publish
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
