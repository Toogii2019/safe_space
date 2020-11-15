import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '80%',
    },
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const handleChange = (e) => {
    props.setSearchedUser(e.target.value);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Search for Username" onChange={handleChange} variant="outlined" />
    </form>
  );
}
