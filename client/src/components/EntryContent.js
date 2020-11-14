import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import {posting, posts} from '../utils/API';

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



export default function MultilineTextFields(props) {
  useEffect(() => {
    posts()
    .then(res =>
      localStorage.setItem("allposts", JSON.stringify(res.data)))
    },[]);

    
  const classes = useStyles();
  const [postTitle, setTitle] = useState()
  const [postContent, setContent] = useState()
  
  const handlePrivatePost = (e) => {
    let username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    let postInfo = {
      date: new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString(),
      user: username,
      title: postTitle,
      post: postContent,
      private: true,
    }
    sendPost(postInfo); 
    getAllPublicPosts();
    handleDiscard();
  }

  const getAllPublicPosts = () => {
    posts()
    .then(res => {
      localStorage.setItem("allposts", JSON.stringify(res.data));
      // props.track(JSON.parse(localStorage.setItem("allposts", JSON.stringify(res.data))));
      
    }
    )
  }

  const handlePublicPost = (e) => {
    let username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    let postInfo = {
      date: new Date().toDateString().split(" ").slice(1,4).join(" ") + ", " + new Date().toLocaleTimeString(),
      user: username,
      title: postTitle,
      post: postContent,
      private: false,
    }
    sendPost(postInfo); 
    getAllPublicPosts();
    props.track([1,2,3]);
    handleDiscard();
  }

  const handleDiscard = () => {
    setContent("");
    setTitle("");
  }

  const sendPost = (postInformation) => {
    posting(postInformation)
    .then(res => {
      localStorage.setItem("lastestPost", JSON.stringify(res.data))
      console.log(res);
    })
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" id = "newEntry">
      <div>
        <h1>Enter New Post</h1>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Note Title"
          multiline
          rowsMax={4}
          value={postTitle}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Enter Note Content"
          multiline
          rows={4}

          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
          value={postContent}
        />
      </div>
      <div>
      <Button
        variant="contained"
        color="default"
        size="large"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={handlePublicPost}
      >
        Upload To Public
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="large"
        value="private"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handlePrivatePost}
      >
        Save To Private Note
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        value="public"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={handleDiscard}
      >
        Discard Note
      </Button>
    </div>
  </form>
    
  );
}