import React, { useContext, useState } from "react";
import "./setting.css";
import { Context } from "../context/Context";
import axios from "axios";

import SideBar from "../component/sideBar";

const Setting = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <>
      <div className="setting">
        <div className="mainSetting">
          <div className="settingTitle">
            <span className="updateProfiel">Update Your Account</span>
          </div>
          <form className="settingProfile" onSubmit={handleSubmit}>
            <label>Profile Picture</label>~
            <div className="settingPic">
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                alt="Profile pic"
              />
              <label htmlFor="fileInput">
                <i className=" settingIcone fa-solid fa-user-ninja"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="settingSubmit" type="submit">
              Update
            </button>
            {success && (
              <span className="updatedmsg">YOUR PROFILE HAS BEEN UPDATED</span>
            )}
          </form>
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default Setting;
