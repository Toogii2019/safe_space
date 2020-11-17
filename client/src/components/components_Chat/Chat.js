import React from 'react';
import MessageList from './MessageList';
import PropTypes from 'prop-types';
import io from 'socket.io-client'
import defaultAvatar from './ironman.jpg';

var receivedOnce = false;
var idCount = 0
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: '',
      chat: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
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
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname
    let msgObj =
      {
        "text": this.state.message,
        "id": idCount ++,
        "sender": {
          "name": username,
          "uid": username,
          "avatar": defaultAvatar,
        },
      }
    const socket = io.connect("https://safe-space-chat-service.herokuapp.com")

    socket.emit('message', { user, msgObj })
    this.setState({ message: '', user })
  };

  scrollToBottom = () => {
    const chat = document.getElementById('end-of-chat');
    chat.scrollIntoView();
  };

  render() {
    let {isLoading, user, renderMessage, chat} = this.props;
    let {message} = this.state;

    return (
      <div className='chat-box'>
        <div className='msg-page'>
          <MessageList
            isLoading={isLoading}
            messages={chat} 
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