import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AddIcon from '@material-ui/icons/Add';
import DownloadIcon from '@material-ui/icons/FileDownload';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = {
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const onNewTheme = () => {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    ([currentTab]) => {
      chrome.tabs.sendMessage(currentTab.id, { msg: 'EDIT_MODE_ON' });
    },
  );  
};

const Menu = ({ classes }) => (
  <BottomNavigation className={classes.menu}
    showLabels>
    <BottomNavigationAction onClick={onNewTheme} label="New" icon={<AddIcon />} />
    <BottomNavigationAction label="Download" icon={<DownloadIcon />} />
    <BottomNavigationAction label="Manage" icon={<SettingsIcon />} />
  </BottomNavigation>
);

export default withStyles(styles)(Menu);
