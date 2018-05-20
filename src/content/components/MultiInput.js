import React from 'react';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { withStyles } from 'material-ui/styles';
import { units } from '../../utils';

const styles = {
  input: {
    width: 59,
  },
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

const MultiInput = ({
  classes, unit, onUnitChange,
  leftValue, rightValue, topValue,
  bottomValue, onLeftValueChange,
  onRightValueChange, onTopValueChange, label,
  onBottomValueChange,
}) => (
  <div className={classes.container}>
    <label className={classes.label}>{ label }</label>
    <table>
      <tbody>
        <tr>
          <td></td>
          <td><TextField value={topValue}
            className={classes.input}
            onChange={onTopValueChange} />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td><TextField value={leftValue}
            className={classes.input}
            onChange={onLeftValueChange} />
          </td>
          <td></td>
          <td>
            <TextField value={rightValue}
              className={classes.input}
              onChange={onRightValueChange} />
          </td>
          <td>
            <Select native
              value={unit}
              onChange={onUnitChange}
              className={classes.input}>
              {units.map(u => <option value={u}>{u}</option>)}
            </Select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <TextField value={bottomValue}
              className={classes.input}
              onChange={onBottomValueChange} />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default withStyles(styles)(MultiInput);
