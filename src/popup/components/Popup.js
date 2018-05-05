import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Themes } from '../../utils/storage';
import Header from './Header';
import Menu from './Menu';
import ThemeList from './ThemeList';
/* global chrome */

const styles = {
  container: {
    position: 'relative',
    width: 320,
    paddingBottom: 56,
  },
};

class Popup extends React.Component {
  state = {
    themes: [],
    site: '',
  }

  constructor(props) {
    super(props);

    Themes.get()
      .then(themes => this.setState({ themes }));

    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      ([currentTab]) => {
        // creating <a> element to obtain hostname
        const temp = document.createElement('a');
        temp.href = currentTab.url;

        this.setState({
          site: temp.hostname,
        });
      },
    );
  }
  onNewTheme = () => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      ([currentTab]) => {
        chrome.tabs.sendMessage(currentTab.id, { msg: 'EDIT_MODE_ON' });
        window.close();
      },
    );
  }

  onMoreThemes = () => {
    chrome.tabs.create({ url: 'https://google.com' });
  }

  onSettings = () => {
    // TODO: open options page
  }

  onToggleTheme = () => {

  }

  onEditTheme = () => {

  }

  onDeleteTheme = () => {

  }

  render() {
    const { classes } = this.props;
    const { site, themes } = this.state;

    return (
      <Paper className={classes.container}>
        <Header site={site} />
        <ThemeList themes={themes}
          onToggle={this.onToggleTheme}
          onEdit={this.onEditTheme}
          onDelete={this.onDeleteTheme} />

        <Menu onNewTheme={this.onNewTheme}
          onMoreThemes={this.onMoreThemes}
          onSettings={this.onSettings} />
      </Paper>
    );
  }
}

export default withStyles(styles)(Popup);
