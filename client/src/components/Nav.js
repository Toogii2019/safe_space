import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EntryGrid from './EntryGrid';
import ProfileGrid from './ProfileGrid';
import MessageGrid from './MessageGrid';
import Notification from './Notification';
import {getPublicNotifications} from '../utils/API'

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
    width: '98%',
    margin: "auto",
    borderRadius: "15px"
  },
}));

export default function ScrollableTabsButtonAuto() {
  const [unreadNotifications, setunreadNotifications] = useState(0);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [feedtracker, setfeed] = React.useState([]);
  const [noticetracker, setNotice] = React.useState([]);
  const publicFeedTracking = {
    val: feedtracker,
    setval: setfeed
  }

  const noticeTracking = {
    val: noticetracker,
    setval: setNotice
  }

  useEffect(() => {
    const nickname = JSON.parse(localStorage.getItem("currentUser")).nickname;
    getPublicNotifications(nickname)
    .then(res => {
      let unreadCounter = 0
      for (let i=0; i< res.data.length; i++) {
        if (res.data[i].user !== JSON.parse(localStorage.getItem("currentUser")).nickname && res.data[i].read === false) {
          unreadCounter ++;
        }
      }
      setunreadNotifications(unreadCounter);
    })
  })

  // const notificationTabName = `Notification ${}`

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example" for nav tab design
        > 
          <Tab to={'/profile'} label="Profile" {...a11yProps(0)} />
          <Tab to={'/publicfeed'} label="Public Feed" {...a11yProps(1)} />
          <Tab to={'/notification'} label={"Notification " + unreadNotifications}  {...a11yProps(2)} />
          <Tab to={'/message'} label="Message" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProfileGrid></ProfileGrid>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <EntryGrid trackfeed={publicFeedTracking}></EntryGrid>
      </TabPanel>
      <TabPanel value={value} index={2} tracknotice={noticeTracking}>
        <Notification tracknotice={noticeTracking}></Notification>
      </TabPanel>
      <TabPanel value={value} index={3}>
       <MessageGrid></MessageGrid>
      </TabPanel>
    </div>
  );
}