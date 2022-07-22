import React from "react";
import "./posts.css";
import Post from "./post";
import { useState } from "react";
const Posts = ({ posts }) => {
  const [imgs] = useState([2, 3, 4, 12, 6]);
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p._id} imgs={imgs[0]} post={p} />
      ))}
      {/* <Post imgs={imgs[1]} />
      <Post imgs={imgs[3]} />
      <Post imgs={imgs[4]} /> */}
    </div>
  );
};

export default Posts;
