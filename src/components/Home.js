//Home.js
import React, { Component } from "react";
import axios from "axios";
import Navigator from "./Navigator";
import Allposts from "./Allposts";
import { Link } from 'react-router-dom';//this is for routing

axios.defaults.withCredentials = true;// this is getting credentials

//adding a functional component add and link it to the main component via props
const Header = (props) =>(
  <h1>{props.pageheader}</h1>  
);



export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        user:null,
        error:'Please Login'
    }
          

    axios.get('http://localhost:8000/api/currentuser')
    .then(function(result){
        console.log(result);
        this.setState({
            user: result.data,
            error: ''
        })
    }.bind(this))
    .catch(error => console.log(error))   
    
}


 render() {

  ////////////////////////////////////////////////////
   //this const is to show the date in the home page
  const gettingCurrantDate = () =>{
  const date = new Date();
  return date.toDateString();
  }
  ///////////////////////////////////////////////////

  
   return (
     <div>
     <Header pageheader="Craigslist"/>
     <h3>Latest Listings</h3>
     <h3>Today's date is: {gettingCurrantDate()}</h3>
     { this.state.user && <h1> Hello, {this.state.user.name}</h1> }
      {this.state.user &&
      <Link className='btn nav-link btn-danger' to='/Logout'>
      Log out
      </Link>}
      <br />
      {this.state.user &&
    <Link className="btn nav-link btn-success" to="/Newlisting">
    Post listing
    </Link>}
    <br />
    {this.state.user &&
    <Link className="btn nav-link btn-primary" to="/Allusers">
    See all users
    </Link>}
      <br />
     <Navigator />
     <Allposts />

     </div>
   );
 }
}