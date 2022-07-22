import React from "react";
import "./postDetails.css";
import SideBar from "../component/sideBar";
import SinglePost from "../component/singlPost";

const PostDetails = () => {
  return (
    <>
      <div className="postdetails">
        <SinglePost />
        <SideBar />
      </div>
    </>
  );
};

export default PostDetails;
