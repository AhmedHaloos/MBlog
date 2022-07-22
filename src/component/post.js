import React from "react";
import "./post.css";
import { Link } from "react-router-dom";
const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  return (
    <>
      <div className="post">
        {post.photo && <img src={PF + post.photo} alt="postimge" />}
        <div className="postDetails">
          <div className="postInfos">
            {post.categories.map((c) => (
              <span key={c._id} className="postinfo">
                {c.name}
              </span>
            ))}
          </div>

          <Link className="link" to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <div className="postDate">
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          <div className="postTitle">
            <span>{post.desc}</span>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Post;
