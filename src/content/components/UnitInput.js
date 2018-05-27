import React from 'react';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import { units } from '../../utils';

const UnitInput = ({
  value, unit, onValueChange,
  onUnitChange, ...rest
}) => (
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
      {units.map((u, i) => <option key={i} value={u}>{u}</option>)}
    </Select>
  </div>
);

export default UnitInput;
