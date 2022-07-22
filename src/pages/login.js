import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handelLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <>
      <div className="login">
        <form onSubmit={handelLogin}>
          <div className="left">
            <div className="header">
              <h2 className="animation a1">Welcome Back</h2>
              <h4 className="animation a2">
                Log in to your account using Username and password
              </h4>
            </div>
            <div className="form">
              <input
                type="text"
                className="form-field animation a3"
                placeholder="Username"
                ref={userRef}
              />
              <input
                type="password"
                className="form-field animation a4"
                placeholder="Password"
                ref={passwordRef}
              />
              <p className="animation a5">
                <Link to="/register">Don't have an account! Sign Up</Link>
              </p>
              <button
                className="animation a6"
                type="submit"
                disabled={isFetching}
              >
                LOGIN
              </button>
            </div>
          </div>
        </form>
        <div className="right"></div>
      </div>
    </>
  );
};

export default Login;
