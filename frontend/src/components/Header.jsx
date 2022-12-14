// import logo from '../assets/logos/logo.jpg'
import { FaWolfPackBattalion } from "react-icons/fa";

const Header = () => {
   return (
      <nav class="navbar navbar-dark bg-dark bg-light">
         <a class="navbar-brand" href="#">
            <FaWolfPackBattalion />
            WOLFTECH
         </a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
               <li class="nav-item">
                  <a class="nav-link" href="#">My profile</a>
               </li>
               <li class="nav-item active">
                  <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">My Feed</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">Notifications</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">Comunity</a>
               </li>
               {/* <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
               </li> */}
            </ul>
            <form class="form-inline">
               <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
               <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
            </form>
         </div>
      </nav>
   );
}

export default Header;