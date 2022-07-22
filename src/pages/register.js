import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const handelRegestier = async (e) => {
    e.preventDefault();
    setErr(true);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="register">
        <div className="Rright"></div>
        <form onSubmit={handelRegestier}>
          <div className="Rleft">
            <div className="Rheader">
              <h2 className="Ranimation a1">Welcome to II Blog</h2>
              <h4 className="Ranimation a2">Sign Up using google account</h4>
            </div>
            <div className="Rform">
              <input
                type="Username"
                className="Rform-field Ranimation a3"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                className="Rform-field Ranimation a4"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-field Ranimation a5"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-field Ranimation a6"
                placeholder="Confirm Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="Ranimation a7">
                <Link to="/login">Have already an account! Login</Link>
              </p>
              <button className="Ranimation a8" type="submit">
                Sign Up
              </button>
              {err && <span className="err">somthing went wrong!</span>}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
