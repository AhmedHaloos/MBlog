import React, { useContext } from "react";
import "./singlePost.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const SinglePost = () => {
  const loc = useLocation();
  const path = loc.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  const deleteHandler = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const updateHandler = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainPost">
      <div className="postD">
        {post.photo && (
          <img className="singlePost" src={PF + post.photo} alt="" />
        )}
        <div className="titlesContainer">
          {updateMode ? (
            <input
              type="text"
              value={title}
              className="postHeadInput"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus={true}
            />
          ) : (
            <h1 className="postHead">
              {title}

              {post.username === user.username && (
                <div className="cruds">
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => setUpdateMode(true)}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={deleteHandler}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="info">
            <span className="Autor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="time">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <textarea
              type="text"
              cols="60"
              rows="10"
              className="postDescTextArea"
              onChange={(e) => setDesc(e.target.value)}
            >
              {desc}
            </textarea>
          ) : (
            <p>{desc}</p>
          )}
        </div>
        {updateMode && (
          <button className="updatebtn" onClick={updateHandler}>
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
