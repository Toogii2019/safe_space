import io from 'socket.io-client'

const socket = io.connect("https://safe-space-chat-service.herokuapp.com")


export const sendMessage = ({user, msgObj}) => socket.emit('message', { user, msgObj });
export const receiveMessage = (username, chat, setChat, chatBuddy, setChatBuddy) => {
    socket.on('message', ({ user, msgObj }) => {   
      
        if ((user === username || msgObj.sender.name === username) && (user !== undefined)) {
          setChat((oldChat) => {
            msgObj.source = username;
            const newChat = [...oldChat, msgObj];
            return newChat
          })
  
          if ((chatBuddy !== msgObj.sender.name) && (username !== msgObj.sender.name)) {
            setChatBuddy(msgObj.sender.name)
          }
        }
        else if (msgObj.text.slice(0,5).toLowerCase() === "@here") {
  
          setChat((oldChat) => {
            msgObj.source = username;
            const newChat = [...oldChat, msgObj];
            return newChat
          })
        }
      })
};


