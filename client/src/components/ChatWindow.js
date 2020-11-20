import React from 'react';
import ChatBox from "./components_Chat/";
import './components_Chat/style.css';
import './style.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    const user = {
      "uid": username
    };
    this.setState({ user: user });
  }

  render() {
    return (
      <div className='container' style={{maxWidth: '800px', paddingTop: '40px'}}>
        <div className='chat-header'>
          {this.props.chatGetter ? <h5 style={{color: "blue"}}>You are messaging {this.props.chatGetter} </h5>: <h5 style={{color: "Black"}}>Messaging</h5>}
        </div>
        <ChatBox socket={this.props.socket} chat={this.props.chat} setChat={this.props.setChat} receiver={this.props.chatGetter} user={this.state.user} chatSetter={this.props.chatSetter} />
      </div>
    )
  }
}

export default App;