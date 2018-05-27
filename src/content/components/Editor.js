import React from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/css';
import 'brace/theme/monokai';
import Paper from 'material-ui/Paper';
import SelectIcon from '@material-ui/icons/Launch';
import LeftIcon from '@material-ui/icons/ArrowBack';
import RightIcon from '@material-ui/icons/ArrowForward';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SquareIcon from '@material-ui/icons/FeaturedVideo';
import BorderIcon from '@material-ui/icons/CropSquare';
import SaveIcon from '@material-ui/icons/Save';
import BuildIcon from '@material-ui/icons/Build';
import UnitInput from './UnitInput';
import ColorPicker from './ColorPicker';
import MultiInput from './MultiInput';
import Select from './Select';
import Checkbox from './Checkbox';
import ElementStateRadio from './ElementStateRadio';
import NodeSelector from '../../utils/nodeSelector';
import { CONTAINER_ID } from '../../utils';
import ThemeInjector from '../../utils/themeInjector';
import { Themes } from '../../utils/storage';
import vkbeautify from '../../utils/vkbeautify';
import { toCSS } from '../../utils/CSSJSON';


const drawerWidth = 240;

const styles = theme => ({
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
  root: {
    flexGrow: 1,
    minHeight: 430,
    maxHeight: 800,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: 294,
    boxSizing: 'border-box',
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  themeTextField: {
    color: '#fff',
  },
});

const getValue = (cssValue) => {
  if (!cssValue) return '';
  const regExp = cssValue.match(/^(\d|\.)+/);
  if (regExp) {
    return regExp[0];
  }
  return '';
};

const getUnit = (cssValue) => {
  if (!cssValue) return 'px';
  const regExp = cssValue.match(/\D+$/);
  if (regExp) {
    return regExp[0];
  }
  return 'px';
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
      REtheme: props.REtheme,
      elementState: 'default',
      stick: 'right',
      selectedIndex: 0,
      open: false,
      selector: null,
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
      REtheme: this.state.REtheme.styles[selector] ? this.state.REtheme : {
        ...this.state.REtheme,
        styles: {
          ...this.state.REtheme.styles,
          [selector]: {},
        },
      },
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

  onSelectorChange = (sel) => {
    this.setState({
      selector: sel.value,
    });
  }

  onCreateSelector = (selector) => {
    this.setState({
      REtheme: {
        ...this.state.REtheme,
        styles: {
          ...this.state.REtheme.styles,
          [selector]: {},
        },
      },
      selector,
    });
  }

  onNameChange = (e) => {
    this.setState({
      REtheme: {
        ...this.state.REtheme,
        name: e.target.value,
      },
    });
  }

  onREthemeSave = () => {
    console.log(this.state.REtheme);
    this.setState({
      REtheme: {
        ...this.state.REtheme,
        domains: this.state.REtheme.domains.filter(domain => domain.trim() !== ''),
      },
    }, () => {
      if (this.props.editing) {
        Themes.edit(this.state.REtheme);
      } else {
        Themes.add(this.state.REtheme);
      }
    });
  }

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  onListItemClick = (index) => {
    this.setState({
      selectedIndex: index,
    });
  }

  injectLivePreviewTheme = () => {
    ThemeInjector.eject(this.liveThemeId);
    this.liveThemeId = ThemeInjector.inject(this.state.REtheme);
  }

  onUnitChange = property => (e) => {
    const { REtheme, selector } = this.state;
    const selectorStyles = REtheme.styles[selector] ? REtheme.styles[selector] : {};

    if (!selectorStyles[property]) return;

    this.setState({
      REtheme: {
        ...REtheme,
        styles: {
          ...REtheme.styles,
          [this.state.selector]: {
            ...selectorStyles,
            [property]: getValue(selectorStyles[property]) + e.target.value,
          },
        },
      },
    }, this.injectLivePreviewTheme);
  }

  onValueChange = property => (e) => {
    const { REtheme, selector } = this.state;
    const selectorStyles = REtheme.styles[selector] ? REtheme.styles[selector] : {};
    let addUnit = true;

    if (['font-weight', 'font-style', 'visibility',
      'color', 'background-color', 'font-family',
      'text-align', 'border-style', 'border-color'].includes(property)) {
      addUnit = false;
    }

    this.setState({
      REtheme: {
        ...REtheme,
        styles: {
          ...REtheme.styles,
          [this.state.selector]: {
            ...selectorStyles,
            [property]: e.target.value + (addUnit ? getUnit(selectorStyles[property]) : ''),
          },
        },
      },
    }, this.injectLivePreviewTheme);
  }

  onDomainChange = (e, index) => {
    const domains = [...this.state.REtheme.domains];
    domains[index] = e.target.value;

    this.setState({
      REtheme: {
        ...this.state.REtheme,
        domains,
      },
    });
  }
  onDomainAdd = () => {
    this.setState({
      REtheme: {
        ...this.state.REtheme,
        domains: [...this.state.REtheme.domains, ''],
      },
    });
  }

  getList = (i) => {
    const styles = this.state.REtheme.styles[this.state.selector] || {};

    return [
      // Text
      <React.Fragment>
        <UnitInput value={getValue(styles['font-size'])}
          unit={getUnit(styles['font-size'])}
          label="Size"
          onChange={this.onValueChange('font-size')}
          onUnitChange={this.onUnitChange('font-size')} />
        <UnitInput value={getValue(styles['line-height'])}
          unit={getUnit(styles['line-height'])}
          label="Line Height"
          onChange={this.onValueChange('line-height')}
          onUnitChange={this.onUnitChange('line-height')} />
        <UnitInput value={getValue(styles['letter-spacing'])}
          unit={getUnit(styles['letter-spacing'])}
          label="Letter Spacing"
          onChange={this.onValueChange('letter-spacing')}
          onUnitChange={this.onUnitChange('letter-spacing')} />
        <Select value={styles['font-family']}
          label="Family"
          options={['Arial', 'Consolas']}
          onChange={this.onValueChange('font-family')} />
        <Select value={styles['text-align']}
          label="Align"
          options={['left', 'right', 'center', 'justify']}
          onChange={this.onValueChange('text-align')} />
        <ColorPicker label="Color"
          color={styles.color}
          defaultColor="#ffffff"
          onChange={this.onValueChange('color')} />
        <Checkbox label="Bold"
          checked={styles['font-weight'] === 'bold' || styles['font-weight'] > 600}
          onChange={() => this.onValueChange('font-weight')({ target: { value: (styles['font-weight'] === 'bold' || styles['font-weight'] > 600) ? 'normal' : 'bold' } })} />
        <Checkbox label="Italic"
          checked={styles['font-style'] === 'italic'}
          onChange={() => this.onValueChange('font-style')({ target: { value: styles['font-style'] === 'italic' ? 'normal' : 'italic' } })} />
      </React.Fragment>,

      // Layout
      <React.Fragment>
        <Checkbox label="Visible"
          checked={styles.visibility === 'visible'}
          onChange={() => this.onValueChange('visibility')({ target: { value: styles.visibility === 'visible' ? 'hidden' : 'visible' } })} />
        <UnitInput value={getValue(styles.width)}
          unit={getUnit(styles.width)}
          label="Width"
          onChange={this.onValueChange('width')}
          onUnitChange={this.onUnitChange('width')} />
        <UnitInput value={getValue(styles.height)}
          unit={getUnit(styles.height)}
          label="Height"
          onChange={this.onValueChange('height')}
          onUnitChange={this.onUnitChange('height')} />
        <ColorPicker label="Color"
          color={styles['background-color']}
          onChange={this.onValueChange('background-color')} />
        {/* <TextField label="Image URL"
        value={this.state.selectorStyles.image}
        fullWidth
     /> */}
        <MultiInput label="Margin"
          leftValue={getValue(styles['margin-left'])}
          rightValue={getValue(styles['margin-right'])}
          topValue={getValue(styles['margin-top'])}
          bottomValue={getValue(styles['margin-bottom'])}
          unit={styles['margin-left'] ?
            getUnit(styles['margin-left']) : styles['margin-right'] ?
              getUnit(styles['margin-right']) : styles['margin-top'] ?
                getUnit(styles['margin-top']) : getUnit(styles['margin-bottom'])}
          onUnitChange={(e) => {
            this.onUnitChange('margin-left')(e);
            this.onUnitChange('margin-right')(e);
            this.onUnitChange('margin-top')(e);
            this.onUnitChange('margin-bottom')(e);
          }}
          onLeftValueChange={this.onValueChange('margin-left')}
          onRightValueChange={this.onValueChange('margin-right')}
          onTopValueChange={this.onValueChange('margin-top')}
          onBottomValueChange={this.onValueChange('margin-bottom')} />
        <MultiInput label="Padding"
          leftValue={getValue(styles['padding-left'])}
          rightValue={getValue(styles['padding-right'])}
          topValue={getValue(styles['padding-top'])}
          bottomValue={getValue(styles['padding-bottom'])}
          unit={styles['padding-left'] ?
            getUnit(styles['padding-left']) : styles['padding-right'] ?
              getUnit(styles['padding-right']) : styles['padding-top'] ?
                getUnit(styles['padding-top']) : getUnit(styles['padding-bottom'])}
          onUnitChange={(e) => {
            this.onUnitChange('padding-left')(e);
            this.onUnitChange('padding-right')(e);
            this.onUnitChange('padding-top')(e);
            this.onUnitChange('padding-bottom')(e);
          }}
          onLeftValueChange={this.onValueChange('padding-left')}
          onRightValueChange={this.onValueChange('padding-right')}
          onTopValueChange={this.onValueChange('padding-top')}
          onBottomValueChange={this.onValueChange('padding-bottom')} />
      </React.Fragment>,

      // Border
      <React.Fragment>
        <Select value={styles['border-style']}
          label="Style"
          options={['solid', 'dotted', 'dashed', 'double', 'groove', 'none']}
          onChange={this.onValueChange('border-style')} />
        <UnitInput value={getValue(styles['border-width'])}
          unit={getUnit(styles['border-width'])}
          label="Width"
          onChange={this.onValueChange('border-width')}
          onUnitChange={this.onUnitChange('border-width')} />
        <ColorPicker label="Color"
          color={styles['border-color']}
          defaultColor="#ffffff"
          onChange={this.onValueChange('border-color')} />
      </React.Fragment>,

      // Save
      <React.Fragment>
        <Typography>Domains to apply the REtheme</Typography>
        {this.state.REtheme.domains.map((domain, index) => <TextField key={index}
          value={domain}
          onChange={e => this.onDomainChange(e, index)} />)}
        <Button onClick={this.onDomainAdd}>ADD DOMAIN</Button>
        <Button variant="raised"
          color="primary"
          onClick={this.onREthemeSave}>
          SAVE THEME
      </Button>
      </React.Fragment>,

      // Advanced
      <React.Fragment>
        <AceEditor mode="css"
          theme="monokai"
          value={vkbeautify.css(toCSS(this.state.REtheme.styles))}
          editorProps={{ $blockScrolling: true }}
          wrapEnabled
          width="260px"
          height="400px" />
      </React.Fragment>,
    ][i];
  }

  render() {
    const { classes } = this.props;
    const {
      elementState, stick, selector,
      selecting, REtheme, selectedIndex,
    } = this.state;
    const REthemeSelectors = Object.keys(REtheme.styles).map(sel => ({ value: sel, label: sel }));
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
            options={REthemeSelectors}
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
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                <MenuIcon />
              </IconButton>
              <TextField value={REtheme.name}
                onChange={this.onNameChange}
                InputProps={{ className: classes.themeTextField }} />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {REtheme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem onClick={() => this.onListItemClick(0)} button>
                <ListItemIcon>
                  <TextFieldsIcon />
                </ListItemIcon>
                <ListItemText primary="Text" />
              </ListItem>
              <ListItem onClick={() => this.onListItemClick(1)} button>
                <ListItemIcon>
                  <SquareIcon />
                </ListItemIcon>
                <ListItemText primary="Layout" />
              </ListItem>
              <ListItem onClick={() => this.onListItemClick(2)} button>
                <ListItemIcon>
                  <BorderIcon />
                </ListItemIcon>
                <ListItemText primary="Border" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem onClick={() => this.onListItemClick(3)} button>
                <ListItemIcon>
                  <SaveIcon />
                </ListItemIcon>
                <ListItemText primary="Save" />
              </ListItem>
              <ListItem onClick={() => this.onListItemClick(4)} button>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Advanced" />
              </ListItem>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.getList(selectedIndex)}
          </main>
        </div>
      </Paper>
    );
  }
}

Editor.defaultProps = {
  REtheme: {
    name: 'New Theme',
    author: 'author',
    styles: {},
    domains: [window.location.hostname],
  },
};

export default withStyles(styles, { withTheme: true })(Editor);
