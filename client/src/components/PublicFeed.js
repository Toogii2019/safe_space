import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

Row.propTypes = {
  row: PropTypes.shape({
    history: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Row(props) {
  const { row } = props;
  const username = JSON.parse(localStorage.getItem("currentUser")).email
  const classes = useStyles();
  
  useEffect(() => { 
    posts(username)
    .then(res => localStorage.setItem("allposts", JSON.stringify(res.data)))
  }, []);

  return (
    <Card className={classes.root}>
      <CardContent>
      {JSON.parse(localStorage["userPrivatePost"]).map((contents) => (
        <Row key={row.name} row={row} /> ))}
        <h1>{row.email}</h1>
        <Typography variant="h5" component="h2" style = {{ textAlign: "left", fontSize: "20px"}}> 
          {row.title}
        </Typography>
        <Typography variant="body2" component="p" style = {{ textAlign: "left", marginBottom: ""}}>
          {row.post}
        </Typography>
      </CardContent>
    </Card>
    
  );
}
