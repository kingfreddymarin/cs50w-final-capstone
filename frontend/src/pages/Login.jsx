import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { FaWolfPackBattalion } from "react-icons/fa";


const Login = () => {
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")

   const handleLogin = () => {
      console.log({
         username: username,
         password: password
      })
      if (!username || !password) {
         alert("No blanks!")
         return
      }
      Axios.post('http://localhost:8000/login/', {
         username: username,
         password: password
      }).then(function (response) {
         const token = `Token ${response.data.token}`
         window.localStorage.setItem("token", token)
         window.localStorage.setItem("isLoggedIn", "true")
         document.location.reload()
      }).catch(function (error) {
         console.log(error)
         error.response.data.non_field_errors ? alert(error.response.data.non_field_errors) : console.log('credentials are okay')
      });
   }
   return (
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
         <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
               <div className="col-lg-12 col-xl-11">
                  <div className="mt-5 mb-5 card text-black" style={{ borderRadius: "25px" }}>
                     <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                           <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                              <div className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 d-flex align-items-center justify-content-center">Login |
                                 <div className="navbar-brand ml-1 mt-2" href="#">
                                    <FaWolfPackBattalion />
                                    WOLFTECH
                                 </div>
                              </div>

                              <form className="mx-1 mx-md-4">
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setUsername(e.target.value)} type="text" id="form3Example1c" value={username} className="form-control" />
                                       <label className="form-label" htmlFor="form3Example1c">Username</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setPassword(e.target.value)} type="password" id="form3Example4c" value={password} className="form-control" />
                                       <label className="form-label" htmlFor="form3Example4c">Password</label>
                                    </div>
                                 </div>
                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button onClick={handleLogin} type="button" className="btn btn-dark btn-lg">Login</button>
                                 </div>
                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    Don't have an account yet?
                                 </div>
                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <Link to='/register'>
                                       <button type="button" className="btn btn-dark btn-lg">Register</button>
                                    </Link>
                                 </div>
                              </form>
                           </div>
                           <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                 className="img-fluid" alt="Sample image" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

   );
}

export default Login;