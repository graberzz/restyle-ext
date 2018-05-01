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
});


class Menu extends React.Component {
  state = {
    open: false,
    selectedIndex: 0,
    styles: {
      units: {
        fontSize: '%',
        lineHeight: 'px',
        letterSpacing: 'px',
        width: 'px',
        height: 'px',
        margin: 'px',
        padding: 'px',
        borderWidth: 'px',
      },
      fontSize: 16,
      lineHeight: 16,
      letterSpacing: 16,
      textAlign: 'left',
      fontFamily: 'Arial',
      color: '#000',
      bold: false,
      italic: false,
      visible: true,
      width: 100,
      height: 100,
      border: {
        style: 'solid',
        color: '#fff',
        width: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          common: 0,
        },
      },
      backgroundColor: '#000',
      margin: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        common: 0,
      },
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        common: 0,
      },
      image: 'https://placehold.it/300x300',
    },
  }

  onUnitChange = property => e => this.setState({
    styles: {
      ...this.state.styles,
      units: {
        ...this.state.styles.units,
        [property]: e.target.value,
      },
    },
  })

  getList = i => [
    // Text
    <React.Fragment>
      <UnitInput value={10} unit={this.state.styles.units.fontSize} label="Size" onUnitChange={this.onUnitChange('fontSize')} />
      <UnitInput value={10} unit={this.state.styles.units.lineHeight} label="Line Height" onUnitChange={this.onUnitChange('lineHeight')} />
      <UnitInput value={10} unit={this.state.styles.units.letterSpacing} label="Letter Spacing" onUnitChange={this.onUnitChange('letterSpacing')} />
      <Select options={['Arial', 'Consolas']} value="Arial" label="Family" />
      <Select options={['left', 'right', 'center', 'justify']} value="left" label="Align" />
      <ColorPicker label="Color" />
      <Checkbox label="Bold" checked={true} />
      <Checkbox label="Italic" checked={true} />
    </React.Fragment>,

    // Layout
    <React.Fragment>
      <Checkbox label="Visible" checked={true} />
      <UnitInput value={10} unit={this.state.styles.units.width} label="Width" onUnitChange={this.onUnitChange('width')} />
      <UnitInput value={10} unit={this.state.styles.units.height} label="Height" onUnitChange={this.onUnitChange('height')} />
      <ColorPicker label="Color" />
      <MultiInput label="Margin" />
      <MultiInput label="Padding" />
    </React.Fragment>,

    // Border
    <React.Fragment>
      <Select options={['solid', 'dotted']} value="solid" label="Style" />
      <MultiInput label="Width" />
      <ColorPicker label=" Color" />
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
            <Typography variant="title" color="inherit" noWrap>
              vk.com
            </Typography>
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

export default withStyles(styles, { withTheme: true })(Menu);
