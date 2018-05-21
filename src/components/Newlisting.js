//Newlising.js
import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";//this is for routing




export default class Newlising extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      data: {
        title: "",
        desc: "",
        location: "",
        price: "",
        contact: ""
      },
      error: {
        
        title: "",
        desc: "",
        location: "",
        price: "",
        contact: ""
      },
      success: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  getCurrentUser(){
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


  handleChange(element) {
    var formData = this.state.data;
    formData[element.target.name] = element.target.value;
    this.setState({
      data: formData
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    let _this = this;
    axios
      .post("http://localhost:8000/api/postlist", this.state.data)
      .then(res => {
        console.log("res", res);
        if (res.data.errors) {
          let mainErrors = res.data.errors;
          let err_msg = {
            title: mainErrors.title ? mainErrors.title.msg : "",
            desc: mainErrors.desc ? mainErrors.desc.msg : "",
            location: mainErrors.location ? mainErrors.location.msg : "",
            price: mainErrors.price ? mainErrors.price.msg : "",
            contact: mainErrors.contact ? mainErrors.contact.msg : ""
          };
          _this.setState({
            error: err_msg,
            success: ""
          });
        } else {
          _this.setState({
           
            data: {
              title: "",
              desc: "",
              location: "",
              price: "",
              contact: "",
            },
            error: {
             
              title: "",
              desc: "",
              location: "",
              price: "",
              contact: ""
            },
            success: "Thank you for posting item"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Link className='btn btn-success' to={'/'}>Home Page</Link>
        <br />
        <h1>Create a new listing</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputname">Title</label>
            <input
              type="text"
              name="title"
              value={this.state.data.title}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputtitle"
              placeholder="Title"
            />
            <h3 className="text-danger">{this.state.error.title}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Description</label>
            <textarea
              type="text"
              name="desc"
              value={this.state.data.desc}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputdesc"
              placeholder="Discription"
            />
            <h3 className="text-danger">{this.state.error.desc}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputname">Location</label>
            <input
              type="text"
              name="location"
              value={this.state.data.location}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputjoblocation"
              placeholder="Location"
            />
            <h3 className="text-danger">{this.state.error.location}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPrice">Price</label>
            <input
              type="text"
              name="price"
              value={this.state.data.price}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputprice"
              placeholder="Price"
            />
            <h3 className="text-danger">{this.state.error.price}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputConfirmationContact">
              Contact information
            </label>
            <input
              type="text"
              name="contact"
              value={this.state.data.contact}
              onChange={this.handleChange}
              className="form-control"
              id="exampleInputConfirmationcontact"
              placeholder="Contact information"
            />
            <h3 className="text-danger">{this.state.error.contact}</h3>
          </div>
          <button type="submit" className="btn btn-primary">
            Post listing
          </button>
        </form>
        {this.state.success === "" ? (
          <p />
        ) : (
          <p className="text-success">{this.state.success}</p>
        )}
        <br />
        <br />
      
      </div>
    );
  }
}