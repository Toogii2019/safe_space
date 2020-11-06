import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs'; for nav tab design
// import Tab from '@material-ui/core/Tab'; for nav tab design
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EntryGrid from './EntryGrid';
import ProfileGrid from './ProfileGrid';
import MessageGrid from './MessageGrid';
import Notification from './Notification';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<Router>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        {/* <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" for nav tab design
        > */} 
          <Link to={'/profile'} label="Profile" {...a11yProps(0)}>Profile</Link>
          {/* <Link to={'/publicfeed'} label="Public Feed" {...a11yProps(1)}>Public Feed</Link> */}
          <Link to={'/notification'} label="Notification" {...a11yProps(2)}>Notification</Link>
          <Link to={'/message'} label="Message" {...a11yProps(3)}>Message</Link>
          <Link to={'/feed_entry'} label="Entry" {...a11yProps(4)}>Entry and Public Feed</Link>
        {/* </Tabs> */}
      </AppBar>
      <Switch>
      {/* <TabPanel value={value} index={0}> */}
        <Route exact path='/profile' component={ProfileGrid} />
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={1}> */}
        {/* <Route exact path='/publicfeed' component={PublicFeed} /> */}
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={2}> */}
        <Route exact path='/notification' component={Notification} />
      {/* </TabPanel>
      <TabPanel value={value} index={3}> */}
       <Route exact path='/message' component={MessageGrid} />
      {/* </TabPanel> */}
      {/* <TabPanel value={value} index={4}> */}
        <Route exact path='/feed_entry' component={EntryGrid} />
      {/* </TabPanel> */}
      </Switch>
    </div>
    </Router>
  );
}