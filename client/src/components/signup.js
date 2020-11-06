import React, { Component } from "react";
import $ from 'jquery';

export default class SignUp extends Component {

    handleSignUp = () => {
        const newUserInfo = {
            nickname: $(".nickname").val(),
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

        fetch("/api/sign_up", data)
        .then(res => console.log(res));;
    }

    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Nick Name</label>
                    <input type="text" className="form-control nickname" placeholder="Nick Name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control email" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control password" placeholder="Enter password" />
                </div>

                <button type="button" className="btn btn-light btn-block" onClick={this.handleSignUp}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <button type="button" className="btn btn-light btn-block" >Sign In</button>
                </p>
            </form>
        );
    }
}