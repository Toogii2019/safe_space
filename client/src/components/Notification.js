import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import {getPublicNotifications} from '../utils/API'

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

export default function SimpleCard() {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getPublicNotifications()
    .then(res => {
      let notificationsLocal = []
      for (let i=0; i< res.data.length; i++) {
        if (res.data[i].user !== JSON.parse(localStorage.getItem("currentUser")).nickname) {
          notificationsLocal.push(res.data[i]);
        }
      }
      setNotifications(notificationsLocal);
    })
      
    },[]);

  return (
      <Card className={classes.root}>
      {notifications.length === 0
      ?  <h1>You dont have any notifications</h1>
      :  <></>
      }

      {notifications && notifications.sort(() => (-1)).map((notice) => (
      <CardContent>
          <Avatar></Avatar>
          <Typography variant = "h6" component="h6" style = {{ textAlign: "Left", fontSize: "20px", marginLeft: "60px", marginTop: "-40px", marginBottom: "20px" }}> <b>{notice.user}</b> {notice.event} </Typography> 
          <hr></hr> 
      </CardContent>
      ))}
    </Card>
  );
}