import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileInfo from './ProfileInfo';
import TablePublic from './TablePublic';
import TablePrivate from './TablePrivate';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: '0px',
  },
  portfolio: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: "600px",
    display: "flex",
    minHeight: "150px"
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.portfolio}><ProfileInfo></ProfileInfo></Paper>
        </Grid>
        <Grid item xs={12}>
            <h1>Postings</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><TablePublic></TablePublic></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><TablePrivate></TablePrivate></Paper>
        </Grid>
      </Grid>
    </div>
  );
}