import React, { Component } from "react";
import {login, userPublicPosts,userPrivatePosts} from "../utils/API";
// import './loginSignup.css';

export default class Login extends Component {

    state= {
        email: "",
        password: "" 
    }

    getPublicPosts = (username) => {
        userPublicPosts(username)
        .then(res => {
          localStorage.setItem("userPublicPost", JSON.stringify(res.data));
        })
      }
    
    getPrivatePosts = (username) => {
        userPrivatePosts(username)
        .then(res => {
          localStorage.setItem("userPrivatePost", JSON.stringify(res.data));
        })
      }

    handleSignIn = () => {
        console.log("Sending user info for sign in");
        login(this.state)
        .then(res => {
            if (res.data === null) {
                localStorage.clear();
                alert("Username or Password is incorrect!");
                this.setState({email: "", password: ""});
            }
            else {
                localStorage.setItem("currentUser", JSON.stringify(res.data));
                // this.getPublicPosts(this.state.email);
                // this.getPrivatePosts(this.state.email);
                this.props.setUser(res.data);

                window.location.replace("/member")
            }
        });
    }

    

    handleChange = ({target:{name,value}}) => this.setState({[name]:value})
    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} value={this.state.email} name="email" className="form-control email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} value={this.state.password} name="password" className="form-control password" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="button" className="btn btn-light btn-block" onClick={ this.handleSignIn }>Sign In</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
}