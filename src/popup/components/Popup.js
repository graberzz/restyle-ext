import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Header from './Header';
import Menu from './Menu';
import ThemeList from './ThemeList';

const themes = [
  {
    name: 'Dark theme',
    author: 'author',
  },
  {
    name: 'Blue theme',
    author: 'author',
  },
];

const styles = {
  container: {
    position: 'relative',
    width: 320,
    paddingBottom: 56,
  },
};

const Popup = ({ classes }) => (
  <Paper className={classes.container}>
    <Header site="google.com" />
    <ThemeList themes={themes} />
    <Menu />
  </Paper>
);

export default withStyles(styles)(Popup);
