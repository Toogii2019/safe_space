import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import {getPublicNotifications, updateNotification} from '../utils/API'

const useStyles = makeStyles({
  root: {
    width: "70%",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    position: "relative" ,
    display: "inline-block",
  },
  title: {
    fontSize: "8px",
    textAlign: "left"
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  const handleNotifications = (e) => {
    const nickname = JSON.parse(localStorage.getItem("currentUser")).nickname;
    updateNotification(e.target.dataset.id, nickname)
    .then(res => {
      props.tracknotice.setval([])
    })
  }

  useEffect(() => {
    const nickname = JSON.parse(localStorage.getItem("currentUser")).nickname;
    getPublicNotifications(nickname)
    .then(res => {
      let notificationsLocal = []
      for (let i=0; i< res.data.length; i++) {
        if (res.data[i].user !== JSON.parse(localStorage.getItem("currentUser")).nickname && res.data[i].read === false) {
          notificationsLocal.push(res.data[i]);
        }
      }
      setNotifications(notificationsLocal);
    })
      
    },[props]);

  return (
      <Card className={classes.root}>

      {notifications && notifications.sort(() => (-1)).map((notice) => (
      <CardContent>
          <Avatar></Avatar>
          <Typography variant = "h6" component="h6" style = {{ textAlign: "Left", fontSize: "20px", marginLeft: "60px", marginBottom: "20px", cursor: "pointer" }}> <div data-id={notice._id} onClick={handleNotifications}><b>{notice.user}</b> {notice.event}</div> </Typography> 
          <hr></hr> 
      </CardContent>
      ))}
    </Card>
  );
}