import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import {post} from '../utils/API';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [postvalue, setValue] = useState(
    { contentTitle : "",

      content : ""}
  );

  const handleChange = (event) => {
   
    console.log("handling change"); 
    setValue(event);
  };
  
  const handlePost = (event) => {
    console.log("work")
    console.log(postvalue);
    console.log(postvalue.contentTitle);
    console.log(postvalue.content);

  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <h1>Enter New Entry</h1>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Note Title"
          multiline
          rowsMax={4}
          value={postvalue.contentTitle}
          onChange={(e) => setValue({[e.target.name]: e.target.value})}
          variant="outlined"
          name="contentTitle"
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Enter Note Content"
          multiline
          rows={4}
          defaultValue="Content"
          variant="outlined"
          onChange={(e) => setValue({[e.target.name]: e.target.value})}
          value={postvalue.content}
          name="content"
        />
      </div>
      <div>
      <Button
        variant="contained"
        color="default"
        size="large"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload To Public
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handlePost}
      >
        Save To Private Note
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Discard Note
      </Button>
    </div>
  </form>
    
  );
}
