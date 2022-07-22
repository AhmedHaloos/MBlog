import React from "react";
import "./home.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SideBar from "../component/sideBar";
import Posts from "../component/posts";

import { useEffect, useState } from "react";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="mainn">
        <div className="headerTop">
          <div className="titles">
            <p>Discover Cultures & food</p>
            <h1>II Blog</h1>
          </div>
        </div>
        <div className="addPost">
          <Link to="/CreatePost">
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </Link>
        </div>
        <div className="homeBody">
          <div className="bod">
            <Posts posts={posts} />
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
