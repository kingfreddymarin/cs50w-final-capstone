// import logo from '../assets/logos/logo.jpg'
import { useState } from "react";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
   const [loggedIn, setLoggedIn] = useState(false)
   return (
      <nav class="navbar navbar-dark bg-dark bg-light">
         <a class="navbar-brand" href="#">
            <FaWolfPackBattalion />
            WOLFTECH
         </a>
         {!loggedIn && (
            <>
               <div className="d-flex">
                  <Link to="/login" className="nav-link hover" style={{ color: 'white' }}>
                     Login
                  </Link>
                  <Link to="/register" className="nav-link hover" style={{ color: 'white' }}>
                     Register
                  </Link>
               </div>
            </>
         )}
         {loggedIn && (
            <>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                     <li className="nav-item">
                        <a className="nav-link" href="#">My profile</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">My Feed</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Notifications</a>
                     </li>
                     <li className="nav-item">
                        <a className="nav-link" href="#">Comunity</a>
                     </li>
                     {/* <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
               </li> */}
                  </ul>
                  <form className="form-inline">
                     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                     <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                  </form>
               </div>
            </>
         )}
      </nav>
   );
}

export default Header;