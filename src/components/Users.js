//Users.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function Result(props) {
    return (
        props.users.map((user)=>{
            return(
                <ul className='users' key={user._id}>
                <div className="card-body">
                    <h2 className="card-title">Username: {user.name}</h2>
                    {/* <h4 className="card-title">Job title: {user.email}</h4>
                    <h4 className="card-text">job title: {user.jobTitle}</h4> */}
                    <Link className='btn btn-primary' to={'/user/'+user._id}>Details</Link>
                    <hr />
                </div>
                </ul>
            )
        })
    )
}


class Users extends Component {
    constructor(props) {
        super(props);
        this.state={
            users:null
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/users/')
        .then((res)=>this.setState({users:res.data}))
    }
    logoutHandler(){
        axios.get('http://localhost:8000/api/logout').then((res)=>null);
    }
    render() {
        return (
            <div>
            <h1>All Registered Users</h1>
             <Nav/>
            {this.state.users && <Result users ={this.state.users} />}
            </div>
        );
    }
}

export default Users;