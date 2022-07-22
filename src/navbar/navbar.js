import React, { useContext } from "react";
import { Context } from "../context/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style/main.css";

const Navbar = () => {
  const [hideBar, setHideBar] = useState(true);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [cats, setCats] = useState([]);

  const hideNavHandler = () => {
    setHideBar(false);
  };
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/categories/");
      setCats(res.data);
    };
    getCat();
  }, []);
  return (
    <>
      <div className="top">
        <div className="left">
          <h1 className="logo">
            <Link to="/" className="link">
              II Blog
            </Link>
          </h1>
        </div>
        <div className="right">
          <input type="checkbox" id="burger-toggle" />

          <label for="burger-toggle" class="burger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </label>

          <div className="menu">
            <div className="menu-inner">
              <ul className="menu-nav">
                {user ? (
                  <li class="menu-nav-item">
                    <Link className="link menu-nav-linkk " to="/setting">
                      <img src={PF + user.profilePic} alt="" />

                      <p>{user.username}</p>
                    </Link>
                  </li>
                ) : (
                  <li className="menu-nav-item">
                    <Link className="link menu-nav-link" to="/login">
                      <span>
                        <div>Login</div>
                      </span>
                    </Link>
                  </li>
                )}
                <li class="menu-nav-item">
                  <Link className="link menu-nav-link" to="/">
                    <span>
                      <div>Home</div>
                    </span>
                  </Link>
                </li>

                <li class="menu-nav-item">
                  <Link className="link menu-nav-link" to="/setting">
                    <span>
                      <div>Profile</div>
                    </span>
                  </Link>
                </li>
                {user ? (
                  <li class="menu-nav-item" onClick={logoutHandler}>
                    <Link className=" link menu-nav-link" to="/">
                      <span>
                        <div>Logout</div>
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li class="menu-nav-item">
                    <Link
                      className=" link menu-nav-link"
                      to="/register"
                      onClick={hideNavHandler}
                    >
                      <span>
                        <div>Register</div>
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="gallery">
              <div className="title">
                <p>Our Topics</p>
              </div>

              <div className="images">
                {cats.map((c) => (
                  <Link
                    key={c._id}
                    to={`/?cat=${c.name}`}
                    className=" link image-link"
                  >
                    <div className="image" data-label={c.name}>
                      <img src={`./images/${c.name}.jpg`} alt="" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
