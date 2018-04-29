import React from 'react';
import { withStyles } from 'material-ui/styles';
import LibColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

const styles = {
  container: {
    marginTop: 8,
    marginBottom: 4,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 5,
    padding: 0,
    fontSize: '.75rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: 1,
  },
};

const ColorPicker = ({ classes, label, onChange }) => (
  <div className={classes.container}>
    <div className={classes.label}>{label}</div>
    <LibColorPicker onChange={onChange}/>
  </div>
);

export default withStyles(styles)(ColorPicker);
