import React, { Component } from "react";
import $ from 'jquery';

export default class Login extends Component {

    handleSignIn = () => {
        console.log("Sending user info for sign in");

        const newUserInfo = {
            email: $(".email").val(),
            password: $(".password").val() 
        }

        const data = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserInfo)
        };
        fetch("/api/sign_in", data)
        .then(res => console.log(res));
    }

    render() {
        return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control password" placeholder="Enter password" />
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