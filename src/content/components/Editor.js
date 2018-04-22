import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SelectIcon from '@material-ui/icons/Launch';
import LeftIcon from '@material-ui/icons/ArrowBack';
import RightIcon from '@material-ui/icons/ArrowForward';
import Tooltip from 'material-ui/Tooltip';
import ElementStateRadio from './ElementStateRadio';
import Menu from './Menu';

const style = {
  position: 'fixed',
  top: 0,
  left: 'auto',
  right: 0,
  zIndex: 1337,
};

const styleLeft = {
  ...style,
  left: 0,
  right: 'auto',
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
    const { elementState, stick } = this.state;

    return (
      <Paper style={stick === 'right' ? style : styleLeft}>
        <Tooltip title="Select element">
          <IconButton>
            <SelectIcon />
          </IconButton>
        </Tooltip>
        <IconButton onClick={this.onStickChange}>
          {stick === 'right' ? <LeftIcon /> : <RightIcon />}
        </IconButton>
        <ElementStateRadio onClick={this.onElementStateChange}
          selected={elementState} />

        <Menu />
      </Paper>
    );
  }
}

export default Editor;
