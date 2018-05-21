//Navigator.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class Navigator extends Component {

 render() {

   return <div className="Navbtn">
           
       <ul className="nav justify-content-center">
         <li className="nav-item">

         </li>
         <br />
         <li className="nav-item">
           <br />
           <Link className="btn nav-link btn-success" to="/logreg">
             Login and Register
           </Link>
         </li>
       </ul>
     </div>;
 }
}

export default Navigator;