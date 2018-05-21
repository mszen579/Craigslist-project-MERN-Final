//Allposts.js
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function Result(props) {
    return (
        props.posts.map((post)=>{
            return(
                <ul className='users' key={post._id}>
                <div className="card-body">
                    <h2 className="card-title">Title: {post.title}</h2>
                    <h4 className="card-title">Price: {post.price} Euros</h4>
                    <h4 className="card-title">Added by: {post.user.name} </h4>
                    <h4 className="card-text">Added on: {post.createdat}</h4>
                    <Link className='btn btn-primary' to={'/post/'+post._id}>Post Details</Link>
                    <hr />
                </div>
                </ul>
            )
        })
    )
}

class Allposts extends Component {
    constructor(props) {
        super(props);
        this.state={
            posts:null
        }

        
    }
    componentDidMount(){
        axios.get('http://localhost:8000/api/Allposts/')
        .then((res)=>this.setState({posts:res.data})) 
        
    }
  
 

    render() {
        return (
            <div>
            {this.state.posts && <Result posts ={this.state.posts} />}
            
            </div>
        );
    }
}

export default Allposts;