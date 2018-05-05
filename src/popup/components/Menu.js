import React from 'react';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AddIcon from '@material-ui/icons/Add';
import DownloadIcon from '@material-ui/icons/FileDownload';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from 'prop-types';

const styles = {
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
};

const Menu = ({
  classes, onNewTheme,
  onMoreThemes, onSettings,
}) => (
  <BottomNavigation className={classes.menu}
    showLabels>
    <BottomNavigationAction label="New"
      onClick={onNewTheme}
      icon={<AddIcon />} />
    <BottomNavigationAction label="More Themes"
      onClick={onMoreThemes}
      icon={<DownloadIcon />} />
    <BottomNavigationAction label="Manage"
      onClick={onSettings}
      icon={<SettingsIcon />} />
  </BottomNavigation>
);

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  onNewTheme: PropTypes.func.isRequired,
  onMoreThemes: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

export default withStyles(styles)(Menu);
