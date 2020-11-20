import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import MessageSearch from './MessageSearch';
import io from 'socket.io-client';
import {getChatHistory} from '../utils/API';
import { receiveMessage } from './components_Chat/MessageIO';

const socket = io.connect("https://safe-space-chat-service.herokuapp.com")
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: "0%",
    marginTop: "0%",
    marginLeft: "0%",
    marginRight: "0%",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const [chatBuddy, setChatBuddy] = useState()
  const [searchedUser, setSearchedUser] = useState("")
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    getChatHistory(username)
    .then(res => setChat(res.data))
  },[])

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    
    receiveMessage(username, chat, setChat, chatBuddy, setChatBuddy)

  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <Paper className={classes.paper}><MessageSearch setSearchedUser={setSearchedUser}></MessageSearch></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><h2>Chat List</h2><p style={{color: "black"}}><b>Select user to start chat</b></p><ChatList searchedUser={searchedUser} chatSetter={setChatBuddy}></ChatList></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><ChatWindow socket={socket} chat={chat} setChat={setChat} chatGetter={chatBuddy} chatSetter={setChatBuddy}></ChatWindow></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
