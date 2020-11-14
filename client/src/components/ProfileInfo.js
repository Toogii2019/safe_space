import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {allPosts} from '../utils/API';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "600px",
    paddingTop: "15px",
    minHeight: "150px",
    margin: '0px',
    display: "flex",
    lineHeight: "0.5",
      '& > *': {
        margin: theme.spacing(1),
      },
 },
  title: {
    fontSize: 14,
    textAlign: 'left',
  },
  pos: {
    marginBottom: 12,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

  
export default function ImageAvatars() {
  const [userInfo, setUserInfo] = useState({
    nickname: JSON.parse(localStorage.getItem("currentUser")).nickname,
    email: JSON.parse(localStorage.getItem("currentUser")).email,
    numberOfPrivatePosts: 0,
    numberOfPublicPosts: 0 
  })

  function checkPrivate(post) {
    return post.private
  }

  const classes = useStyles();
  useEffect(() => {
    allPosts(userInfo.nickname)
    .then(res => {
        if (res.data !== null) {
          console.log(res.data);
          let privatePostCount = 0;
          let publicPostCount = 0;
          for (let i=0;i<res.data.length;i++) {
            if (res.data[i].private) {
              privatePostCount ++;
            }
            else {
              publicPostCount ++;
            }
          }
          setUserInfo({...userInfo, numberOfPrivatePosts: privatePostCount, numberOfPublicPosts: publicPostCount});
        }
    });

    },[]);

  return (
    <Card className={classes.root}>
      <CardContent>
        {/* <div className={classes.root}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
        </div> */}
        <Typography variant="body2" component="column" class="postnumbers" style={{}}>
        <div class="container">
        <div class="row"> 
          <div class="col-sm naming"><h1 class = "nickname">{userInfo.nickname}</h1><br></br>{userInfo.email}</div>
          <div class="col-sm count"><h2 class = "counting">{userInfo.numberOfPublicPosts}</h2> <br></br> Public Posts </div>
          <div class="col-sm count"><h2 class = "counting">{userInfo.numberOfPrivatePosts}</h2> <br></br> Private Posts </div>
        </div>
        </div>
        </Typography>
      </CardContent>
    </Card>
  );
}