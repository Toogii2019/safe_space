
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {userPublicPosts, deletePost} from '../utils/API';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row, id, trackpost } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const handleDeletePost = () => {
    deletePost(String(id))
    .then(res => {
      console.log(res.data);
      trackpost([])
    })
  }


  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="public">
                <DeleteIcon onClick={handleDeletePost} style={{cursor: "pointer"}}></DeleteIcon>
                <TableHead>
                  <TableRow>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.post}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

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


export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [trackPostDelete, settrackPostDelete] = useState([]);
  
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("currentUser")).nickname;
    userPublicPosts(username)
    .then(res => {
      localStorage.setItem("userPublicPost", JSON.stringify(res.data));
        if (JSON.parse(localStorage.getItem("userPublicPost")) !== null) {
          setRows(JSON.parse(localStorage.getItem("userPublicPost")));
        }
    })
    },
    [trackPostDelete]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Public</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows && rows.sort(()=> (-1)).map((row) => (
            <Row key={row.id} row={row} id={row._id} trackpost={settrackPostDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}