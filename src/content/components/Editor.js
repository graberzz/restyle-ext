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
import NodeSelector from '../../utils/nodeSelector';
import { CONTAINER_ID } from '../../utils';
import Select from './Select';

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
    selector: null,
  }

  constructor(props) {
    super(props);

    this.nodeSelector = NodeSelector(
      document.body,
      this.onNodeSelect,
      node => node.closest(`#${CONTAINER_ID}`) !== null,
    );
  }

  onNodeSelect = (prevNode, node, selector) => {
    console.log(prevNode);
    console.log(node);
    console.log(selector);

    this.nodeSelector.suspend();
    
    this.setState({
      selector,
      selecting: false,
    });
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

  onSelectElement = () => {
    this.nodeSelector.toggle();
    this.setState(prevState => ({
      selecting: !prevState.selecting,
    }));
  }

  render() {
    const { classes, theme } = this.props;
    const { elementState, stick, selector, selecting } = this.state;

    return (
      <Paper className={`${classes.editor}  ${stick !== 'right' ? classes.editorLeft : ''}`}>
        <div className={classes.top}>
          <Tooltip title="Select element">
            <IconButton onClick={this.onSelectElement}
            color={selecting ? 'primary' : 'default'}>
              <SelectIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={this.onStickChange}>
            {stick === 'right' ? <LeftIcon /> : <RightIcon />}
          </IconButton>
        </div>
        <ElementStateRadio onClick={this.onElementStateChange}
          selected={elementState} />
        <Menu selector={selector} state={elementState} theme={theme} />
      </Paper>
    );
  }
}

export default withStyles(styles)(Editor);
