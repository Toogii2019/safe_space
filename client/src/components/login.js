import React, { Component } from "react";
import {login} from "../utils/API";
import './loginSignup.css';
import logo from './logo1.png';

export default class Login extends Component {

    state= {
        email: "",
        password: "" 
    }

    handleSignIn = () => {
        if (this.state.email && this.state.password) {
            login(this.state)
            .then(res => {
                if (res.data === null) {
                    localStorage.clear();
                    alert("Username or Password is incorrect!");
                    this.setState({email: "", password: ""});
                }
                else {
                    localStorage.setItem("currentUser", JSON.stringify(res.data))
                    this.props.setUser(res.data);
                    localStorage.setItem("chatHistory", "[]")
                    window.location.replace("/member")
                }
            });
        }
        else {
            alert("Please fill up all the fields");
            this.setState({email: "", password: ""});
        }
    }

    handleChange = ({target:{name,value}}) => this.setState({[name]:value})
    render() {
        return (
            <div className="App">
            {!this.state.user ? <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
              <a href="/" class="logo"><img src={logo} alt="logo" width="180px" height="40px"></img></a>
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
            </form>
            </div>
            </div>
            </div>
        );
    }
}