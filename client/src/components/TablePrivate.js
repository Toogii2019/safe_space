import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {userPrivatePosts} from '../utils/API';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(title) {
  return {	
    title,
    history: [	
      { date: 'Data retrived from Database', content: 'Content retrived from Database' },
    ],	
  };	
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
 
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
              <Typography variant="h6" gutterBottom component="div">
                Content
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.post}</TableCell>
                  </TableRow>
                  </TableBody>
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
  let username = JSON.parse(localStorage.getItem("currentUser")).email
  useEffect(() => {
    userPrivatePosts(username)
    .then(res => {
      localStorage.setItem("userPrivatePost", JSON.stringify(res.data));
    })
    },[]);


  var rows = [];
  
  if (JSON.parse(localStorage.getItem("userPrivatePost")) === null) {
    rows = [];
  }
  else {
    rows = JSON.parse(localStorage.getItem("userPrivatePost"));
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Private</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.length !== 0 ?
        
        rows.map((row) => (
          <Row key={row.name} row={row} />
          ))
        :
        <Row key={1} row={1} />
        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}