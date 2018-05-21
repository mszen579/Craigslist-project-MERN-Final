//Singlepost.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';
// import dateFormat from 'dateFormat';
var now = new Date();


 
// Basic usage
// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");


function Detail(props) {
    var data= props.postData;
    return(
         <div className="card">
                <h1 className="card-header">
                    Single Post Details
                </h1>
                <div className="card-body">
                    <h3 className="card-title"><b>Title </b> {data.title}</h3>
                    <p className="card-text"><b>Description: </b>  {data.desc}</p>
                    <p className="card-text"><b>Price: </b>  {data.price}</p>
                    <p className="card-text"><b>Listed on: </b> {data.createdat}</p>
                    <p className="card-text"><b>Location: </b>  {data.location}</p>
                    <p className="card-text"><b>Contact details: </b>  {data.contact}</p> 
                     <p className="card-text"><b>Added by: </b> {data.user.name}</p>
                    <Link className='btn btn-primary' to={'/'}>Back</Link>
                 
                </div>
            </div>
    )
 }
 
 class Singlepost extends Component {
    constructor(props) {
        super(props);
        this.state={
            postinfo:null
        }
        axios.get('http://localhost:8000/api/post/'+this.props.match.params._id)
        .then((res)=>this.setState({postinfo:res.data}))
        this.deletePost = this.deletePost.bind(this);
    }

    //deleting post
    deletePost(event){
        event.preventDefault();
        let _this =this;
        axios.delete("http://localhost:8000/api/deletepost/"+this.props.match.params._id)
        .then(function (response) {
          _this.setState({user: null})
        })
        .catch(function (error) {
          console.log(error);
        })
        window.location.href = "/";
    }
 
    render() {
        return (
            <div>
            <Nav/>
            {this.state.postinfo && <Detail postData={this.state.postinfo} />}
            <br />
            <Link className="btn btn-danger" onClick={this.deletePost} to="/">Delete this add</Link>
            </div>
        );
    }
 }
 
 export default Singlepost;