import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Redirect from "../pages/Redirect";
import Profile from "../pages/Profile";
import Community from "../pages/Community"

function App() {
  const token = window.localStorage.getItem("token");
  const [isValid, setIsValid] = useState(null);
  const [loggedUser, setLoggedUser] = useState({});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/", {
        headers: {
          Authorization: token,
        },
      })
      .then(function (response) {
        const user = response.data.user_info;
        // const id = response.data.user_info.id
        setLoggedUser(user);
        setIsValid(true);
      })
      .catch(function (error) {
        console.log(error);
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("isLoggedIn");
        setLoggedUser({});
        setIsValid(false);
      });

    // fetching all categories
    axios
      .get("http://localhost:8000/all-categories")
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isValid ? <Layout /> : <Login />}>
          <Route
            index
            element={<Home categories={categories} currentUser={loggedUser} />}
          />
          <Route
            path="/profile"
            element={<Profile currentUser={loggedUser} />}
          />
          <Route path="/comunity" element={<Community categories={categories} currentUser={loggedUser} />}></Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route
          path="/register"
          element={!isValid ? <Register /> : <Redirect />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
