//Singleuser.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';



function Detail(props) {
    var data= props.userData;
    return(
         <div className="card">
                <h1 className="card-header">
                    Single User Details
                </h1>
                <div className="card-body">
                    <h3 className="card-title"> <b>Name: </b> {data.name}</h3>
                    <p className="card-text"><b>Job Title: </b>  {data.jobTitle}</p>
                    <p className="card-text"><b>Email: </b>  {data.email}</p>
                  
                </div>
            </div>
    )
 }
 
 class Singleuser extends Component {
    constructor(props) {
        super(props);
        this.state={
            userinfo:null
        }
        axios.get('http://localhost:8000/api/user/'+this.props.match.params._id)
        .then((res)=>this.setState({userinfo:res.data}))
    }
 
    render() {
        return (
            <div>
            <Nav/>
            {this.state.userinfo && <Detail userData={this.state.userinfo} />}
            </div>
        );
    }
 }
 
 export default Singleuser;

