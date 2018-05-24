import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { Themes } from '../../utils/storage';
import Header from './Header';
import Menu from './Menu';
import ThemeList from './ThemeList';
import ThemeInjector from '../../utils/themeInjector';
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

    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      ([currentTab]) => {
        // creating <a> element to obtain hostname
        const temp = document.createElement('a');
        temp.href = currentTab.url;

        Themes.get()
          .then(themes => this.setState({
            themes: themes.filter(theme => theme.domains.includes(temp.hostname)),
            site: temp.hostname,
          }));
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
    chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/options.html` });
  }

  onToggleTheme = (id, enabled) => {
    Themes.edit({
      id,
      enabled: !enabled,
    }).then(themes => this.setState({
      themes: themes.filter(theme => theme.domains.includes(this.state.site)),
    }, () => {
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
        },
        ([currentTab]) => {
          chrome.tabs.sendMessage(currentTab.id, { msg: 'REINJECT' });
        },
      );
    }));
  }

  onEditTheme = (id) => {
    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
      },
      ([currentTab]) => {
        chrome.tabs.sendMessage(currentTab.id, { msg: 'EDIT_MODE_ON', themeId: id });
        window.close();
      },
    );
  }

  onDeleteTheme = (id) => {
    Themes.delete(id)
      .then(themes => this.setState({
        themes: themes.filter(theme => theme.domains.includes(this.state.site)),
      }));
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
