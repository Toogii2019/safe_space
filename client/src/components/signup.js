import React, { Component } from "react";
import {signup} from "../utils/API";
// import './loginSignup.css';

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
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Nick Name</label>
                    <input type="text" onChange={this.handleInputChange} value={this.state.nickname} name="nickname" className="form-control nickname" placeholder="Nick Name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleInputChange} value={this.state.email} name="email"  className="form-control email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleInputChange} value={this.state.password} name="password" className="form-control password" placeholder="Enter password" />
                </div>

                <button type="button" className="btn btn-light btn-block" onClick={this.handleSignUp}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <button type="button" className="btn btn-light btn-block" onClick={this.forwardToSignIn} >Sign In</button>
                </p>
            </form>
        );
    }
}