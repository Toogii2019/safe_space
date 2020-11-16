import React from 'react';
import MessageList from './MessageList';
import PropTypes from 'prop-types';
import io from 'socket.io-client'
import defaultAvatar from './ironman.jpg';

const socket = io.connect("https://safe-space-chat-service.herokuapp.com")
class Chat extends React.Component {
  constructor(props) {
    super(props);
    const chatBuddy = localStorage.getItem("currentChatBuddy");
    this.state = {
      message: '',
      user: '',
      chat: JSON.parse(localStorage.getItem(chatBuddy)) || [],
    };
  }

  componentWillUnmount() {
    console.log(this.props.receiver);
    const {chat} = this.state
    if (this.props.receiver) {
      localStorage.setItem(this.props.receiver, JSON.stringify([...chat]))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    const {chat} = this.state
    
    socket.on('message', ({ user, msgObj }) => {   
        if ((user === username || msgObj.sender.name === username) && (user !== undefined)) {
          this.setState({chat: [...chat, msgObj]})
          // localStorage.setItem("chatHistory", JSON.stringify([...JSON.parse(localStorage.getItem("chatHistory")), msgObj]))
          if ((this.props.receiver !== msgObj.sender.name) && (username !== msgObj.sender.name)) {
            this.props.chatSetter(msgObj.sender.name)
          }
        }
        else if (msgObj.text.slice(0,5).toLowerCase() === "@here") {
          this.setState({chat: [...chat, msgObj]})
        }
    })

    if (prevState.message !== this.state.message && this.props.typingListener ) {
      this.props.typingListener();
    }
    this.scrollToBottom();
  }

  handleSendMessage = event => {
    event.preventDefault();
    this.setState({ user: this.props.receiver})
    const {message} = this.state;
    const user = this.props.receiver;

    let msgObj =
      {
        "text": this.state.message,
        "id": this.state.chat[this.state.chat.length - 1] + 1,
        "sender": {
          "name": JSON.parse(localStorage.getItem("currentUser")).nickname,
          "uid": JSON.parse(localStorage.getItem("currentUser")).nickname,
          "avatar": defaultAvatar,
        },
      }

    socket.emit('message', { user, msgObj })
    this.setState({ message: '', user })
  };

  scrollToBottom = () => {
    const chat = document.getElementById('end-of-chat');
    chat.scrollIntoView();
  };

  render() {
    let {isLoading, user, renderMessage} = this.props;
    let {message} = this.state;

    return (
      <div className='chat-box'>
        <div className='msg-page'>
          <MessageList
            isLoading={isLoading}
            messages={this.state.chat} 
            user={user}
            renderMessage={renderMessage}
          />
          <div className='chat-box-bottom'>
            { this.props.typingIndicator?this.props.typingIndicator:'' }
            <div id='end-of-chat'></div>
          </div>
        </div>
        <div className='msg-footer'>
          <form
            className='message-form'
            onSubmit={this.handleSendMessage}>
            <div className='input-group'>
              <input
                type='text'
                className='form-control message-input'
                placeholder='Type something'
                value={message}
                onChange={event => this.setState({ message: event.target.value})}
                required
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  renderMessage: PropTypes.func,
  typingListener: PropTypes.func,
  typingIndicator: PropTypes.element,
};

Chat.defaultProps = {
  messages: [],
  user: {
    "uid": "user1"
  },
  isLoading: false,
};

export default Chat;