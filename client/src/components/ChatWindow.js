import React from 'react';
import ChatBox from "./components_Chat/";
import  './components_Chat/style.css';
import './style.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {

    const user = {
      "uid": JSON.parse(localStorage.getItem("currentUser")).nickname
    };

    this.setState({ user: user });

  }

  render() {
    return (
      <div className='container' style={{maxWidth: '800px', paddingTop: '100px'}}>
        <div className='chat-header'>
          {this.props.chatGetter ? <h5 style={{color: "blue"}}>You are sending privately to {this.props.chatGetter} </h5>: <h5 style={{color: "red"}}>Please choose your friend to send message privately!</h5>}
        </div>
        <ChatBox socket={this.props.socket} chat={this.props.chat} setChat={this.props.setChat} receiver={this.props.chatGetter} user={this.state.user} chatSetter={this.props.chatSetter} />
      </div>
    )
  }
}

export default App;