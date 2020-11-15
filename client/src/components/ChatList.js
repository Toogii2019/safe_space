import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {getUsers} from '../utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([])

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    getUsers(username)
    .then(res => {
      setUsers(res.data)
      users.map(({nickname}) => {
        if (localStorage.getItem(nickname) === null) {
          localStorage.setItem(nickname, "[]")
        }
      })
    })
  })

  const setChatBuddy = (e) => {
    console.log(e.target.textContent);
    localStorage.setItem("currentChatBuddy", e.target.textContent);
    props.chatSetter(e.target.textContent);
  }

  const filteredUsers = users.filter(user => {
    return user.nickname.toLowerCase().indexOf(props.searchedUser.toLowerCase()) !== -1
  })

  return (
    <List className={classes.root}>
      <Divider variant="inset" component="li" />

    {filteredUsers && filteredUsers.map((user) => (

      <ListItem alignItems="flex-start" style={{color: "#1c3131"}}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText style={{ cursor: "pointer"}} onClick={setChatBuddy}
          primary={user.nickname}
          name = {user.nickname}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    )
    )} 
    </List>
  );
}
