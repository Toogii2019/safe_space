import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from './Avatar';
import {posts} from '../utils/API'

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: "5%",
    marginTop: "2%",
    position: "relative" ,
    display: "inline-block"
  },
  title: {
    fontSize: "8px",
    textAlign: "center"
  },
});

export default function SimpleCard() {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  
  useEffect(() => { 
    posts()
    .then(res => {
      if (res.data !== null) {
      localStorage.setItem("allposts", JSON.stringify(res.data))
      setRows(res.data)
      }
    })
  }, []);

  return (
    <div>
    <h2>See All Public Posts From Other Users</h2>
    {rows && rows.sort(()=>(-1)).map((row) => (
    <Card className={classes.root}>
      <CardContent>
        <h4>{row.user}</h4>
        <Typography variant="h5" component="h2" style = {{ textAlign: "left", fontSize: "20px"}}> 
          {row.title}
        </Typography>
        <Typography variant="body2" component="p" style = {{ textAlign: "left", marginBottom: ""}}>
        {row.post} 
        </Typography>
      </CardContent> 
    </Card> 
    ))}
    </div>
  );
}
