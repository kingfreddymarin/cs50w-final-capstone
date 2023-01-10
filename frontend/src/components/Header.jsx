// import logo from '../assets/logos/logo.jpg'
import axios from "axios";
import { FaWolfPackBattalion } from "react-icons/fa";


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
   const handleClick = () => {
      window.location.reload()
   }
   return (
      <nav className="navbar navbar-dark bg-dark bg-light">
         <a className="navbar-brand" href="/">
            <FaWolfPackBattalion />
            WOLFTECH
         </a>
         <>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                  <li>
                     <a className="nav-item nav-link" href="/" onClick={handleClick}>
                        Home
                     </a>
                  </li>
                  <li>
                     <a className="nav-item nav-link" href="/">My Feed</a>
                  </li>
                  <li className="nav-item">
                     <a className="nav-link" href="/comunity" onClick={handleClick}>Comunity</a>
                  </li>
                  <li >
                     <a className="nav-item nav-link" href="/profile">
                        My profile
                     </a>
                  </li>
                  <li className="nav-item">
                     <a onClick={handleLogout} className="nav-link" href="/">Log out</a>
                  </li>
                  {/* <li className="nav-item">
                  <a className="nav-link disabled" href="#">Disabled</a>
               </li> */}
               </ul>
               {/* <form className="form-inline">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
               </form> */}
            </div>
         </>
      </nav>
   );
}

export default Header;