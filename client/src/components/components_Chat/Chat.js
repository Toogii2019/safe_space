import React from 'react';
import MessageList from './MessageList';
import PropTypes from 'prop-types';
import io from 'socket.io-client'
import defaultAvatar from './ironman.jpg';


const socket = io.connect("https://safe-space-chat-service.herokuapp.com")
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      user: '',
      chat: [],
    };
  }

  componentDidMount() {
    console.log(this.props.receiver);
  }

  componentDidUpdate(prevProps, prevState) {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    const {message, user, chat} = this.state
    
    socket.on('message', ({ user, msgObj }) => {   
        if ((user === username || msgObj.sender.name === username) && (user !== undefined)) {
          this.setState({chat: [...chat, msgObj]})
          if ((this.props.receiver !== msgObj.sender.name) && (username !== msgObj.sender.name)) {
            this.props.chatSetter(msgObj.sender.name)
          }
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
    // Socket part start
    console.log(user, message)

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