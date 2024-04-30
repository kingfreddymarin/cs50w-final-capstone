import { useState } from "react";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {
   const navigate = useNavigate();
   const [name, setName] = useState("")
   const [lastName, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [confirmation, setConfirmation] = useState("")

   const handleRegister = () => {
      if (!name || !lastName || !email || !username || !password || !confirmation) {
         alert("No blanks!")
         return
      }
      if (password !== confirmation) {
         alert("passwords must match")
         return
      }
      axios.post('http://localhost:8000/register/', {
         first_name: name,
         last_name: lastName,
         username: username,
         password: password,
         email: email,
      }).then(function (response) {
         const token = `Token ${response.data.token}`
         window.localStorage.setItem("token", token)
         window.location.href = '/'
      }).catch(function (error) {
         console.log(error)
         error.response.data.username ? alert(error.response.data.username) : console.log("username passed")
         error.response.data.email ? alert(error.response.data.email) : console.log("email passed")
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
                              <div className="text-center h1 fw-bold mb-5 mx-md-4 mt-4 d-flex justify-content-center align-items-center">Register |
                                 <div className="navbar-brand ml-1 mt-2" href="#">
                                    <FaWolfPackBattalion />
                                 </div>
                              </div>
                              <form className="mx-1 mx-md-4">
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setName(e.target.value)} type="text" id="name" className="form-control" />
                                       <label value={name} className="form-label" htmlFor="name">Name</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" id="lastName" className="form-control" />
                                       <label className="form-label" htmlFor="lastName">Last name</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" id="username" className="form-control" />
                                       <label className="form-label" htmlFor="username">Username</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" className="form-control" />
                                       <label className="form-label" htmlFor="email">Email</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" className="form-control" />
                                       <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                 </div>
                                 <div className="d-flex flex-row align-items-center mb-4">
                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                    <div className="form-outline flex-fill mb-0">
                                       <input onChange={(e) => setConfirmation(e.target.value)} value={confirmation} type="password" id="confirmation" className="form-control" />
                                       <label className="form-label" htmlFor="confirmation">Confirm Password</label>
                                    </div>
                                 </div>
                                 <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button onClick={handleRegister} type="button" className="btn btn-dark btn-lg">Register</button>
                                 </div>
                                 <div className="d-flex justify-content-center mx-4 mb-1 mb-lg-4">
                                    Already have an account?
                                 </div>
                                 <div className="d-flex justify-content-center  mb-3 mb-lg-4">
                                    <Link to='/login'>
                                       <button type="button" className="btn btn-dark btn-lg">Login</button>
                                    </Link>
                                 </div>
                              </form>
                           </div>
                           <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                 className="img-fluid" alt="Register" />
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

export default Register;