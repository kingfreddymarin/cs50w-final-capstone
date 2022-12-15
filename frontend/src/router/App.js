import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


function App() {
  const token = window.localStorage.getItem("token")
  const [isValid, setIsValid] = useState(true)
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/", {
        headers: {
          'Authorization': token
        }
      }).then(function (response) {
        console.log(response);
        setIsValid(true)
      }).catch(function (error) {
        console.log(error);
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("isLoggedIn")
        setIsValid(false)
      });
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isValid ? <Layout /> : <Login />}>
          <Route index element={<Home />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
