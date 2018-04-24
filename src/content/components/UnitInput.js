import React from 'react';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { MenuItem } from 'material-ui/Menu';

const units = [
  'px',
  '%',
  'em',
  'rem',
];

const UnitInput = ({ value, unit, onValueChange, onUnitChange, ...rest }) => (
  <div>
    <TextField
      value={value}
      onChange={onValueChange}
      margin="dense"
      {...rest} />
    <Select
      native
      value={unit}
      onChange={onUnitChange}>
      {units.map(u => <option value={u}>{u}</option>)}
    </Select>
  </div>
);

export default UnitInput;
