import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {getPublicPosts} from '../utils/API'

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

export default function SimpleCard(props) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  
  useEffect(() => { 
    getPublicPosts()
    .then(res => {
      if (res.data !== null) {
      localStorage.setItem("allposts", JSON.stringify(res.data))
      setRows(res.data)
      }
    })
  }, [props.track]);

  return (
    <div>
    <h2>Public Feed</h2>
    {rows && rows.sort(()=>(-1)).map((row) => (
    <Card className={classes.root}>
      <CardContent>
        <h4>@{row.user}</h4>
        <Typography variant="h5" component="h2" style = {{ textAlign: "left", fontSize: "20px", fontWeight: "700", fontFamily: "Cormorant"}}> 
          {row.title}
        </Typography>
        <Typography variant="body2" component="p" style = {{ textAlign: "left", marginBottom: "", fontSize: "18px", fontFamily: "Cormorant"}}>
        {row.post} 
        <br></br>
        {row.date}
        </Typography>
      </CardContent> 
    </Card> 
    ))}
    </div>
  );
}
