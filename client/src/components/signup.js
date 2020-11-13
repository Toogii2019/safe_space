import React, { Component } from "react";
import {signup} from "../utils/API";
import './loginSignup.css';

export default class SignUp extends Component {
    state = {
        nickname: "",
        email: "",
        password: ""
    }

    handleInputChange = ({target:{value,name}}) => {
        this.setState({[name]:value})
    }

    handleSignUp = () => {
        if (this.state.nickname && this.state.email && this.state.password) {
            signup(this.state)
                .then(res => {
                    if (res.data.email === undefined) {
                        alert("User with the same nickname or email exists in our Database!");
                        this.setState({nickname: "", email: "", password: ""})
                    }
                    else {
                        window.location.replace("/");
                    }
                });;
        }
        else {
            alert("Please fill up all the fields");
            this.setState({nickname: "", email: "", password: ""})
        }
    }

    forwardToSignIn = () => {
        window.location.replace("/");
    }

    render() {
        return (
            <div className="App">
            {!this.state.user ? <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                <a href="/" class="logo">SAFESPACE</a>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <a href="/" class="login">Login</a>
                    </li>
                    <li className="nav-item">
                    <a href="/sign-up" class="signup">Sign up</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav> : <button onClick={this.handleLogout}>Log Out</button>}
            <div className="auth-wrapper">
              <div className="auth-inner">
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Nickname</label>
                    <input type="text" onChange={this.handleInputChange} value={this.state.nickname} name="nickname" className="form-control nickname" placeholder="Enter nickname" />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" onChange={this.handleInputChange} value={this.state.email} name="email"  className="form-control email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleInputChange} value={this.state.password} name="password" className="form-control password" placeholder="Enter password" />
                </div>

                <button type="button" className="btn btn-light btn-block" onClick={this.handleSignUp}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? Click <a href="/">here</a>
                </p>
            </form>
            </div>
            </div>
            </div>
        );
    }
}