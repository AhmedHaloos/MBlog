import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./sideBar.css";

const SideBar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories/");
      setCats(res.data);
    };
    getCat();
  }, []);

  return (
    <>
      <div className="sideBar">
        <div className="sidBarItem">
          <span className="sidBarTitle"> ABOUT ME</span>
          <img src="/images/14.jpg" alt="profileImage" />
          <p>
            Witty Leach the founder of TriggerPoint Design, a leading behavior
            research and design consultancy specializing in using behavior
            economics and decision design to drive consumer decision making. He
            is a behavior design instructor at the Cox School of Business at
            Southern Methodist University .
          </p>
        </div>

        <div className="sidBarItem">
          <span className="sidBarTitle">DISCOVER</span>
          <ul className="sidList">
            {cats.map((c) => (
              <Link key={c._id} to={`/?cat=${c.name}`} className="link">
                <li className="sidListItem">{c.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidBarItem">
          <span className="sidBarTitle">FOLLOW US</span>
          <div className="social">
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
