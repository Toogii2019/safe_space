import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

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
    const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <div className={classes.root}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
        </div>
        <Typography variant="h5" component="h2">
          {JSON.parse(localStorage.getItem("currentUser")).nickname}
        </Typography>
        <Typography variant="body2" component="p">
        {JSON.parse(localStorage.getItem("currentUser")).email}
        </Typography>
        <Typography variant="body2" component="p">

          Number of Public Posts : {JSON.parse(localStorage.getItem("userPublicPost")) !== null ? JSON.parse(localStorage.getItem("userPublicPost")).length : 0}
        </Typography>
        <Typography variant="body2" component="p">
          Number of Private Posts : {JSON.parse(localStorage.getItem("userPrivatePost")) !== null ? JSON.parse(localStorage.getItem("userPrivatePost")).length : 0}
        </Typography>
      </CardContent>
    </Card>
  );
}

