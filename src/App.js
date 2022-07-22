import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Setting from "./pages/setting";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./navbar/navbar";
import SinglePost from "./component/singlPost";
import React, { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PostDetails/:postId" element={<PostDetails />} />
            <Route
              path="/CreatePost"
              element={user ? <CreatePost /> : <Register />}
            />
            <Route
              path="/setting"
              element={user ? <Setting /> : <Register />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:postId" element={<SinglePost />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
