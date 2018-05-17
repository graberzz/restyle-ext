import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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

const drawerWidth = 240;

const styles = theme => ({
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


class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selectedIndex: 0,
      domains: props.theme.domains || [],
    };

    this.initStyles(props, true);
  }

  componentWillReceiveProps(props) {
    this.initStyles(props);
  }

  initStyles(props, constructor = false) {
    const selectorStyles = props.theme.styles[props.selector] ?
      props.theme.styles[props.selector] : {};

    const getValue = (cssValue) => {
      const regExp = cssValue.match(/^\d+/);
      if (regExp) {
        return regExp[0];
      }
      return null;
    };
    const getUnit = (cssValue) => {
      const regExp = cssValue.match(/\D+$/);
      if (regExp) {
        return regExp[0];
      }
      return null;
    };

    const state = {
      styles: {
        units: {
          fontSize: selectorStyles.fontSize ? getUnit(selectorStyles.fontSize) : 'px',
          lineHeight: selectorStyles.lineHeight ? getUnit(selectorStyles.lineHeight) : '%',
          letterSpacing: selectorStyles.letterSpacing ? getUnit(selectorStyles.letterSpacing) : 'px',
          width: selectorStyles.width ? getUnit(selectorStyles.width) : 'px',
          height: selectorStyles.height ? getUnit(selectorStyles.height) : 'px',
          margin: selectorStyles.margin ? getUnit(selectorStyles.margin) : 'px',
          padding: selectorStyles.padding ? getUnit(selectorStyles.padding) : 'px',
          borderWidth: selectorStyles.borderWidth ? getUnit(selectorStyles.borderWidth) : 'px',
        },
        fontSize: selectorStyles.fontSize ? getValue(selectorStyles.fontSize) : null,
        lineHeight: selectorStyles.lineHeight ? getValue(selectorStyles.lineHeight) : null,
        letterSpacing: selectorStyles.letterSpacing ? getValue(selectorStyles.letterSpacing) : null,
        textAlign: selectorStyles.textAlign ? getValue(selectorStyles.textAlign) : null,
        fontFamily: selectorStyles.fontFamily ? getValue(selectorStyles.fontFamily) : null,
        color: selectorStyles.color ? getValue(selectorStyles.color) : null,
        bold: selectorStyles.fontWeight === 'bold' || selectorStyles.fontWeight > 600,
        italic: selectorStyles.fontStyle === 'italic',

        visible: selectorStyles.visibility === 'visible',
        width: selectorStyles.width ? getValue(selectorStyles.width) : null,
        height: selectorStyles.height ? getValue(selectorStyles.height) : null,

        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 0,

        backgroundColor: '#000',

        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,

        padding: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    };

    if (constructor) {
      this.state = {
        ...this.state,
        ...state,
      };
    } else {
      this.setState(state);
    }
  }

  getCSSObject() {
    const { styles } = this.state;
    const { units } = styles;

    return {
      fontSize: styles.fontSize + units.fontSize,
      lineHeight: styles.lineHeight + units.lineHeight,
      letterSpacing: styles.letterSpacing + units.letterSpacing,
      textAlign: styles.textAlign,
      fontFamily: styles.fontFamily,
      color: styles.color,
      fontWeight: styles.bold ? '800' : '400',
      fontStyle: styles.italic ? 'italic' : 'normal',

      visibility: styles.visible ? 'visible' : 'hidden',
      width: styles.width + units.width,
      height: styles.height + units.height,

      borderStyle: styles.borderStyle,
      borderColor: styles.borderColor,
      borderWidth: styles.borderWidth + units.borderWidth,

      backgroundColor: styles.backgroundColor,

      margin: styles.margin + units.margin,
      marginLeft: styles.marginLeft + units.margin,
      marginRight: styles.marginRight + units.margin,
      marginTop: styles.marginTop + units.margin,
      marginBottom: styles.marginBottom + units.margin,

      padding: styles.padding + units.padding,
      paddingLeft: styles.paddingLeft + units.padding,
      paddingRight: styles.paddingRight + units.padding,
      paddingTop: styles.paddingTop + units.padding,
      paddingBottom: styles.paddingBottom + units.padding,
    };
  }

  onUnitChange = property => e => this.setState({
    styles: {
      ...this.state.styles,
      units: {
        ...this.state.styles.units,
        [property]: e.target.value,
      },
    },
  }, () => this.props.onStyleChange(this.getCSSObject()))

  onValueChange = property => e => this.setState({
    styles: {
      ...this.state.styles,
      [property]: e.target.value,
    },
  }, () => this.props.onStyleChange(this.getCSSObject()))


  onDomainChange = (e, index) => {
    const domains = [...this.state.domains];
    domains[index] = e.target.value;

    this.setState({ domains });
  }
  onAddDomain = () => {
    this.setState({
      domains: [...this.state.domains, ''],
    }, () => this.props.onDomainsChange(this.state.domains));
  }

  getList = i => [
    // Text
    <React.Fragment>
      <UnitInput value={this.state.styles.fontSize}
        unit={this.state.styles.units.fontSize}
        label="Size"
        type="number"
        onChange={this.onValueChange('fontSize')}
        onUnitChange={this.onUnitChange('fontSize')} />
      <UnitInput value={this.state.styles.lineHeight}
        unit={this.state.styles.units.lineHeight}
        label="Line Height"
        onChange={this.onValueChange('lineHeight')}
        onUnitChange={this.onUnitChange('lineHeight')} />
      <UnitInput value={this.state.styles.letterSpacing}
        unit={this.state.styles.units.letterSpacing}
        label="Letter Spacing"
        onChange={this.onValueChange('letterSpacing')}
        onUnitChange={this.onUnitChange('letterSpacing')} />
      <Select value={this.state.styles.fontFamily}
        label="Family"
        options={['Arial', 'Consolas']}
        onChange={this.onValueChange('fontFamily')} />
      <Select value={this.state.styles.textAlign}
        label="Align"
        options={['left', 'right', 'center', 'justify']}
        onChange={this.onValueChange('textAlign')} />
      <ColorPicker label="Color"
        color={this.state.styles.color} //        v
        defaultColor={this.state.styles.color} // > does not work
        onChange={this.onValueChange('color')} />
      <Checkbox label="Bold"
        checked={this.state.styles.bold}
        onChange={this.onValueChange('bold')} />
      <Checkbox label="Italic"
        checked={this.state.styles.italic}
        onChange={this.onValueChange('italic')} />
    </React.Fragment>,

    // Layout
    <React.Fragment>
      <Checkbox label="Visible"
        checked={this.state.styles.visible}
        onChange={this.onValueChange('visible')} />
      <UnitInput value={this.state.styles.width}
        unit={this.state.styles.units.width}
        label="Width"
        onChange={this.onValueChange('width')}
        onUnitChange={this.onUnitChange('width')} />
      <UnitInput value={this.state.styles.height}
        unit={this.state.styles.units.height}
        label="Height"
        onChange={this.onValueChange('height')}
        onUnitChange={this.onUnitChange('height')} />
      <ColorPicker label="Color"
        color={this.state.styles.backgroundColor}
        onChange={this.onValueChange('backgroundColor')} />
      {/* <TextField label="Image URL"
        value={this.state.styles.image}
        fullWidth
     /> */}
      <MultiInput label="Margin"
        leftValue={this.state.styles.marginLeft}
        rightValue={this.state.styles.marginRight}
        topValue={this.state.styles.marginTop}
        bottomValue={this.state.styles.marginBottom}
        commonValue={this.state.styles.margin}
        onLeftValueChange={this.onValueChange('marginLeft')}
        onRightValueChange={this.onValueChange('marginRight')}
        onTopValueChange={this.onValueChange('marginTop')}
        onBottomValueChange={this.onValueChange('marginBottom')}
        onCommonValueChange={this.onValueChange('margin')} />
      <MultiInput label="Padding"
        leftValue={this.state.styles.paddingLeft}
        rightValue={this.state.styles.paddingRight}
        topValue={this.state.styles.paddingTop}
        bottomValue={this.state.styles.paddingBottom}
        commonValue={this.state.styles.padding}
        onLeftValueChange={this.onValueChange('paddingLeft')}
        onRightValueChange={this.onValueChange('paddingRight')}
        onTopValueChange={this.onValueChange('paddingTop')}
        onBottomValueChange={this.onValueChange('paddingBottom')}
        onCommonValueChange={this.onValueChange('padding')} />
    </React.Fragment>,

    // Border
    <React.Fragment>
      <Select value={this.state.styles.borderWidth}
        label="Style"
        options={['solid', 'dotted', 'dashed', 'double', 'groove', 'none']}
        onChange={this.onValueChange('borderStyle')} />
      <UnitInput value={this.state.styles.borderWidth}
        unit={this.state.styles.units.borderWidth}
        label="Width"
        onChange={this.onValueChange('borderWidth')}
        onUnitChange={this.onUnitChange('borderWidth')} />
      <ColorPicker label="Color"
        color={this.state.styles.borderColor}
        onChange={this.onValueChange('borderColor')} />
    </React.Fragment>,

    // Save
    <React.Fragment>
      <Typography>Domains to apply the theme</Typography>
      {this.state.domains.map((domain, index) => <TextField value={domain}
        onChange={e => this.onDomainChange(e, index)} />)}
      <Button onClick={this.onAddDomain}>ADD DOMAIN</Button>
      <Button variant="raised"
        color="primary"
        onClick={this.props.onThemeSave}>
        SAVE THEME
      </Button>
    </React.Fragment>,
  ][i]

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  onListItemClick = (index) => {
    this.setState({
      selectedIndex: index,
    });
  }

  render() {
    const { classes, theme } = this.props;
    const { selectedIndex } = this.state;

    return (
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
            <TextField value={theme.name}
              onChange={this.props.onThemeNameChange}
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
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
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
    );
  }
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Menu);
