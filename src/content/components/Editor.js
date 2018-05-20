import React from 'react';
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
      selectedIndex: 0,
      open: false,
      selector: null,
      selectorStyles: {
        units: {},
      },
      REtheme: props.REtheme,
    };
  }

  setSelectorStyles = () => {
    const { REtheme, selector } = this.state;
    const selectorStyles = REtheme.styles[selector] ? REtheme.styles[selector] : {};
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

    this.setState({
      REtheme: {
        ...REtheme,
        styles: {
          ...REtheme.styles,
          [selector]: {
            ...selectorStyles,
            ...this.getCSSObject(),
          },
        },
      },
    });

    this.setState({
      selectorStyles: {
        units: {
          fontSize: getUnit(selectorStyles.fontSize),
          lineHeight: getUnit(selectorStyles.lineHeight),
          letterSpacing: getUnit(selectorStyles.letterSpacing),
          width: getUnit(selectorStyles.width),
          height: getUnit(selectorStyles.height),
          margin: getUnit(selectorStyles.margin),
          padding: getUnit(selectorStyles.padding),
          borderWidth: getUnit(selectorStyles.borderWidth),
        },
        fontSize: getValue(selectorStyles.fontSize),
        lineHeight: getValue(selectorStyles.lineHeight),
        letterSpacing: getValue(selectorStyles.letterSpacing),
        textAlign: getValue(selectorStyles.textAlign),
        fontFamily: getValue(selectorStyles.fontFamily),
        color: getValue(selectorStyles.color),
        bold: selectorStyles.fontWeight ? (selectorStyles.fontWeight === 'bold' || selectorStyles.fontWeight) > 60 : undefined,
        italic: selectorStyles.fontStyle ? selectorStyles.fontStyle === 'italic' : undefined,

        visible: selectorStyles.visibility ? selectorStyles.visibility === 'visible' : undefined,
        width: getValue(selectorStyles.width),
        height: getValue(selectorStyles.height),

        borderStyle: getValue(selectorStyles.borderStyle),
        borderColor: getValue(selectorStyles.borderColor),
        borderWidth: getValue(selectorStyles.borderWidth),

        backgroundColor: getValue(selectorStyles.backgroundColor),

        marginLeft: getValue(selectorStyles.marginLeft),
        marginRight: getValue(selectorStyles.marginRight),
        marginTop: getValue(selectorStyles.marginTop),
        marginBottom: getValue(selectorStyles.marginBottom),

        paddingLeft: getValue(selectorStyles.paddingLeft),
        paddingRight: getValue(selectorStyles.paddingRight),
        paddingTop: getValue(selectorStyles.paddingTop),
        paddingBottom: getValue(selectorStyles.paddingBottom),
      },
    }, () => console.log(this.state));
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
    }, this.setSelectorStyles);
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
    }, this.setSelectorStyles);
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
    }, this.setSelectorStyles);
  }

  onStyleChange = (styles) => {
    if (this.state.selector === null) return;

    this.setState({
      REtheme: {
        ...this.state.REtheme,
        styles: {
          ...this.state.REtheme.styles,
          [this.state.selector]: { ...styles },
        },
      },
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
    console.log(this.state);
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
    const liveTheme = {
      name: 'LIVE_PREVIEW',
      styles: this.getCSSObject(),
    };
    this.liveThemeId = ThemeInjector.inject(liveTheme);
  }

  onUnitChange = property => e => this.setState({
    selectorStyles: {
      ...this.state.selectorStyles,
      units: {
        ...this.state.selectorStyles.units,
        [property]: e.target.value,
      },
    },
  }, this.injectLivePreviewTheme)

  onValueChange = property => e => this.setState({
    selectorStyles: {
      ...this.state.selectorStyles,
      [property]: e.target.value,
    },
  }, this.injectLivePreviewTheme)

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

  onAddDomain = () => {
    this.setState({
      REtheme: {
        ...this.state.REtheme,
        domains: [...this.state.REtheme.domains, ''],
      },
    });
  }

  getCSSObject = () => {
    const { selectorStyles: styles, selector } = this.state;
    const { units } = styles;

    return {
      [selector]: {
        ['font-size']: styles.fontSize ? (styles.fontSize + units.fontSize) : undefined,
        ['line-height']: styles.lineHeight ? (styles.lineHeight + units.lineHeight) : undefined,
        ['letter-spacing']: styles.letterSpacing ? (styles.letterSpacing + units.letterSpacing) : undefined,
        ['text-align']: styles.textAlign,
        ['font-family']: styles.fontFamily,
        color: styles.color,
        ['font-weight']: typeof styles.bold === 'boolean' ? (styles.bold ? '800' : '400') : undefined,
        ['font-style']: typeof styles.italic === 'boolean' ? (styles.italic ? 'italic' : 'normal') : undefined,

        visibility: typeof styles.visible === 'boolean' ? (styles.visible ? 'visible' : 'hidden') : undefined,
        width: styles.width ? (styles.width + units.width) : undefined,
        height: styles.height ? (styles.height + units.height) : undefined,

        ['border-style']: styles.borderStyle,
        ['border-color']: styles.borderColor,
        ['border-width']: styles.borderWidth ? (styles.borderWidth + units.borderWidth) : undefined,

        ['background-color']: styles.backgroundColor,

        ['margin-left']: styles.marginLeft ? (styles.marginLeft + units.margin) : undefined,
        ['margin-right']: styles.marginRight ? (styles.marginRight + units.margin) : undefined,
        ['margin-top']: styles.marginTop ? (styles.marginTop + units.margin) : undefined,
        ['margin-bottom']: styles.marginBottom ? (styles.marginBottom + units.margin) : undefined,

        ['padding-left']: styles.paddingLeft ? (styles.paddingLeft + units.padding) : undefined,
        ['padding-right']: styles.paddingRight ? (styles.paddingRight + units.padding) : undefined,
        ['padding-top']: styles.paddingTop ? (styles.paddingTop + units.padding) : undefined,
        ['padding-bottom']: styles.paddingBottom ? (styles.paddingBottom + units.padding) : undefined,
      },
    };
  }

  getList = i => [
    // Text
    <React.Fragment>
      <UnitInput value={this.state.selectorStyles.fontSize}
        unit={this.state.selectorStyles.units.fontSize}
        label="Size"
        onChange={this.onValueChange('fontSize')}
        onUnitChange={this.onUnitChange('fontSize')} />
      <UnitInput value={this.state.selectorStyles.lineHeight}
        unit={this.state.selectorStyles.units.lineHeight}
        label="Line Height"
        onChange={this.onValueChange('lineHeight')}
        onUnitChange={this.onUnitChange('lineHeight')} />
      <UnitInput value={this.state.selectorStyles.letterSpacing}
        unit={this.state.selectorStyles.units.letterSpacing}
        label="Letter Spacing"
        onChange={this.onValueChange('letterSpacing')}
        onUnitChange={this.onUnitChange('letterSpacing')} />
      <Select value={this.state.selectorStyles.fontFamily}
        label="Family"
        options={['Arial', 'Consolas']}
        onChange={this.onValueChange('fontFamily')} />
      <Select value={this.state.selectorStyles.textAlign}
        label="Align"
        options={['left', 'right', 'center', 'justify']}
        onChange={this.onValueChange('textAlign')} />
      <ColorPicker label="Color"
        color={this.state.selectorStyles.color} //        v
        defaultColor={this.state.selectorStyles.color} // > does not work
        onChange={this.onValueChange('color')} />
      <Checkbox label="Bold"
        checked={this.state.selectorStyles.bold}
        onChange={this.onValueChange('bold')} />
      <Checkbox label="Italic"
        checked={this.state.selectorStyles.italic}
        onChange={this.onValueChange('italic')} />
    </React.Fragment>,

    // Layout
    <React.Fragment>
      <Checkbox label="Visible"
        checked={this.state.selectorStyles.visible}
        onChange={this.onValueChange('visible')} />
      <UnitInput value={this.state.selectorStyles.width}
        unit={this.state.selectorStyles.units.width}
        label="Width"
        onChange={this.onValueChange('width')}
        onUnitChange={this.onUnitChange('width')} />
      <UnitInput value={this.state.selectorStyles.height}
        unit={this.state.selectorStyles.units.height}
        label="Height"
        onChange={this.onValueChange('height')}
        onUnitChange={this.onUnitChange('height')} />
      <ColorPicker label="Color"
        color={this.state.selectorStyles.backgroundColor}
        onChange={this.onValueChange('backgroundColor')} />
      {/* <TextField label="Image URL"
        value={this.state.selectorStyles.image}
        fullWidth
     /> */}
      <MultiInput label="Margin"
        leftValue={this.state.selectorStyles.marginLeft}
        rightValue={this.state.selectorStyles.marginRight}
        topValue={this.state.selectorStyles.marginTop}
        bottomValue={this.state.selectorStyles.marginBottom}
        onLeftValueChange={this.onValueChange('marginLeft')}
        onRightValueChange={this.onValueChange('marginRight')}
        onTopValueChange={this.onValueChange('marginTop')}
        onBottomValueChange={this.onValueChange('marginBottom')} />
      <MultiInput label="Padding"
        leftValue={this.state.selectorStyles.paddingLeft}
        rightValue={this.state.selectorStyles.paddingRight}
        topValue={this.state.selectorStyles.paddingTop}
        bottomValue={this.state.selectorStyles.paddingBottom}
        onLeftValueChange={this.onValueChange('paddingLeft')}
        onRightValueChange={this.onValueChange('paddingRight')}
        onTopValueChange={this.onValueChange('paddingTop')}
        onBottomValueChange={this.onValueChange('paddingBottom')} />
    </React.Fragment>,

    // Border
    <React.Fragment>
      <Select value={this.state.selectorStyles.borderWidth}
        label="Style"
        options={['solid', 'dotted', 'dashed', 'double', 'groove', 'none']}
        onChange={this.onValueChange('borderStyle')} />
      <UnitInput value={this.state.selectorStyles.borderWidth}
        unit={this.state.selectorStyles.units.borderWidth}
        label="Width"
        onChange={this.onValueChange('borderWidth')}
        onUnitChange={this.onUnitChange('borderWidth')} />
      <ColorPicker label="Color"
        color={this.state.selectorStyles.borderColor}
        onChange={this.onValueChange('borderColor')} />
    </React.Fragment>,

    // Save
    <React.Fragment>
      <Typography>Domains to apply the REtheme</Typography>
      {this.state.REtheme.domains.map((domain, index) => <TextField value={domain}
        onChange={e => this.onDomainChange(e, index)} />)}
      <Button onClick={this.onAddDomain}>ADD DOMAIN</Button>
      <Button variant="raised"
        color="primary"
        onClick={this.props.onREthemeSave}>
        SAVE THEME
      </Button>
    </React.Fragment>,
  ][i]

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
    name: 'unnamed REtheme',
    author: 'author',
    styles: {
      body: {
        background: 'red',
      },
      '.block.className': {
        background: 'blue',
      },
      'span.welcomefriend': {
        fontSize: '.5em',
      },
      div: {
        width: '100px',
      },
    },
    domains: ['vk.com', 'vkontakte.ru'],
  },
};

export default withStyles(styles, { withTheme: true })(Editor);
