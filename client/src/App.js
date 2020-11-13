import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import Main from './pages/Main';
import Login from "./components/login";
import SignUp from "./components/signup";

class App extends Component {
  constructor(){
    super();
    this.loggedIn = this.loggedIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    user: null
  }

  componentDidMount(){
    if(localStorage.getItem("currentUser")){
      this.setState({user: JSON.parse(localStorage.getItem("currentUser"))})
    }
  }

  loggedIn(user){
    console.log("setting current user...", user)
    this.setState({user})
  }

  handleLogout(){
    localStorage.removeItem("currentUser");
    localStorage.setItem("userPublicPost", "[]");
    localStorage.setItem("userPrivatePost", "[]");
    localStorage.setItem("allposts", "[]");
    this.setState({user:null})
    window.location.replace("/")
  }
  
  render(){

    return (
      <div className="App">
      <Router>
      {this.state.user && <Redirect to="/member"/>}
      {!this.state.user ? <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      </nav> : <button onClick={this.handleLogout} className="logout">Log Out</button>}
          <Switch>
            <Route exact path='/' component={() => <Login setUser={this.loggedIn}/>} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/member" component={Main}/>
          </Switch>
    </Router>
    </div>
  );
}
}

export default App;
