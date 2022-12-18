// import logo from '../assets/logos/logo.jpg'
import axios from "axios";
import { FaWolfPackBattalion } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
   const handleLogout = () => {
      const token = window.localStorage.getItem('token')
      console.log(token)
      axios.post('http://localhost:8000/logout/', {}, {
         headers: {
            'Authorization': token
         }
      }).then(function (response) {
         window.localStorage.removeItem("token")
         window.localStorage.removeItem("isLoggedIn")
         document.location.reload()
      }).catch(function (error) {
         console.log(error);
      });
   }
   return (
      <nav className="navbar navbar-dark bg-dark bg-light">
         <a className="navbar-brand" href="#">
            <FaWolfPackBattalion />
            WOLFTECH
         </a>
         <>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <Link to="/">
                     <li className="nav-item">
                        <a className="nav-link" href="#">Home</a>
                     </li>
                  </Link>
                  <li className="nav-item">
                     <a className="nav-link" href="#">My Feed</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="#">Comunity</a>
                  </li>
                  <Link to="/profile">
                     <li className="nav-item">
                        <a className="nav-link" href="#">My profile</a>
                     </li>
                  </Link>
                  <li className="nav-item">
                     <a className="nav-link" href="#">Notifications</a>
                  </li>
                  <li className="nav-item">
                     <a onClick={handleLogout} className="nav-link" href="#">Log out</a>
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
      </nav>
   );
}

export default Header;