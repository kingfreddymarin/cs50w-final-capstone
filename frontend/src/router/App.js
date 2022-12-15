import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Redirect from "../pages/Redirect"
import Test from "../pages/Test"

function App() {
  const token = window.localStorage.getItem("token")
  const [isValid, setIsValid] = useState(null)
  const [loggedUser, setLoggedUser] = useState({})
  useEffect(() => {
    axios
      .get("http://localhost:8000/user/", {
        headers: {
          'Authorization': token
        }
      }).then(function (response) {
        console.log(response);
        const user = response.data.user_info
        setLoggedUser(user)
        setIsValid(true)
      }).catch(function (error) {
        console.log(error);
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("isLoggedIn")
        setLoggedUser({})
        setIsValid(false)
      });
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isValid ? <Layout /> : <Login />}>
          <Route index element={<Home />} />
          <Route path="/test" element={<Test />} />

          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="/register" element={!isValid ? <Register /> : <Redirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
