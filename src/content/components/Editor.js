import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SelectIcon from '@material-ui/icons/Launch';
import LeftIcon from '@material-ui/icons/ArrowBack';
import RightIcon from '@material-ui/icons/ArrowForward';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import ElementStateRadio from './ElementStateRadio';
import Menu from './Menu';

const styles = {
  editor: {
    position: 'fixed',
    top: 0,
    left: 'auto',
    right: 0,
    zIndex: 1500,
  },
  editorLeft: {
    left: 0,
    right: 'auto',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class Editor extends React.Component {
  state = {
    elementState: 'default',
    stick: 'right',
  }

  onElementStateChange = (state) => {
    if (state === this.state.elementState) return;

    this.setState({ elementState: state });
  }

  onStickChange = () => {
    this.setState({
      stick: this.state.stick === 'right' ? 'left' : 'right',
    });
  }

  render() {
    const { classes } = this.props;
    const { elementState, stick } = this.state;

    return (
      <Paper className={classes.editor + ' ' + (stick !== 'right' ? classes.editorLeft : '')}>
        <div className={classes.top}>
          <Tooltip title="Select element">
            <IconButton>
              <SelectIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={this.onStickChange}>
            {stick === 'right' ? <LeftIcon /> : <RightIcon />}
          </IconButton>
        </div>
        <ElementStateRadio onClick={this.onElementStateChange}
          selected={elementState} />
        <Menu />
      </Paper>
    );
  }
}

export default withStyles(styles)(Editor);
