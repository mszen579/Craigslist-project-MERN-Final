//NAV.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Nav extends Component {
  render() {
    return (
      <div className="Navbtn">
        <ul className="nav justify-content-center">
         <br />
          <li className="nav-item">
     
            <Link className="btn nav-link btn-success" to="/Allusers">
              Back to Allusers
            </Link>
            <br />
            <Link
              className="nav-link btn-warning"
              to="/"
              onClick={() =>
                axios.get("http://localhost:8000/api/logout").then(res => null)}>
              Logout
            </Link>
           
          </li>
        </ul>
      </div>
    );
  }
}

export default Nav;
