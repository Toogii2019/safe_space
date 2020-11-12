import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {allPosts} from '../utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
 },
  title: {
    fontSize: 14,
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
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {/* <div className={classes.root}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
        </div> */}
        <Typography variant="h5" component="h2">
          {userInfo.nickname}
        </Typography>
        <Typography variant="body2" component="p">
        {userInfo.email}
        </Typography>
        <Typography variant="body2" component="p">

          Number of Public Posts : {userInfo.numberOfPublicPosts}
        </Typography>
        <Typography variant="body2" component="p">
          Number of Private Posts : {userInfo.numberOfPrivatePosts}
        </Typography>
      </CardContent>
    </Card>
  );
}

