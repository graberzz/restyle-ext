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
    display: 'block',
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: 5,
    padding: 0,
    fontSize: '.75rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    lineHeight: 1,
  },
};

const ColorPicker = ({
  classes, label, onChange, ...rest
}) => (
  <div className={classes.container}>
    <label className={classes.label}>{label}</label>
    <LibColorPicker {...rest}
      onChange={({ color }) => onChange({ target: { value: color } }) }/>
  </div>
);

export default withStyles(styles)(ColorPicker);
