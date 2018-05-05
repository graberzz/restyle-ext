import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SelectIcon from '@material-ui/icons/Launch';
import LeftIcon from '@material-ui/icons/ArrowBack';
import RightIcon from '@material-ui/icons/ArrowForward';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import CreatableSelect from 'react-select/lib/Creatable';
import ElementStateRadio from './ElementStateRadio';
import Menu from './Menu';
import NodeSelector from '../../utils/nodeSelector';
import { CONTAINER_ID } from '../../utils';

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
  selectorsSelect: {
    width: 250,
    marginTop: 5,
    zIndex: 9999,
  },
};

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.nodeSelector = NodeSelector(
      document.body,
      this.onNodeSelect,
      node => node.closest(`#${CONTAINER_ID}`) !== null,
    );

    this.state = {
      elementState: 'default',
      stick: 'right',
      selector: null,
      theme: props.theme,
    };
  }

  mapElementStateToPseudoClass = elementState => ({
    hover: ':hover',
    click: ':active',
    default: '',
  })[elementState];

  onNodeSelect = (prevNode, node, nodeSelector) => {
    this.nodeSelector.suspend();
    const selector = nodeSelector + this.mapElementStateToPseudoClass(this.state.elementState);

    this.setState({
      theme: this.state.theme.styles[selector] ? this.state.theme : {
        ...this.state.theme,
        styles: {
          ...this.state.theme.styles,
          [selector]: {},
        },
      },
      selector,
      selecting: false,
    }, () => console.log(this.state));
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

  onSelectorChange = (sel) => {
    this.setState({
      selector: sel.value,
    });
  }

  onCreateSelector = (selector) => {
    this.setState({
      theme: {
        ...this.state.theme,
        styles: {
          ...this.state.theme.styles,
          [selector]: {},
        },
      },
      selector,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      elementState, stick, selector,
      selecting, theme,
    } = this.state;
    const themeSelectors = Object.keys(theme.styles).map(sel => ({ value: sel, label: sel }));
    const selectorValue = { value: selector, label: selector };

    return (
      <Paper className={`${classes.editor}  ${stick !== 'right' ? classes.editorLeft : ''}`}>
        <div className={classes.top}>
          <Tooltip title="Select element">
            <IconButton onClick={this.onSelectElement}
              color={selecting ? 'primary' : 'default'}>
              <SelectIcon />
            </IconButton>
          </Tooltip>
          <CreatableSelect
            value={selectorValue}
            options={themeSelectors}
            onChange={this.onSelectorChange}
            onCreateOption={this.onCreateSelector}
            className={classes.selectorsSelect}
            placeholder="CSS Selector" />
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

Editor.defaultProps = {
  theme: {
    name: 'unnamed theme',
    author: 'author',
    styles: {
      body: {
        background: 'red',
      },
      '.block.className': {
        background: 'blue',
      },
      div: {
        width: '100px',
      },
    },
  },
};

export default withStyles(styles)(Editor);
