import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import LibCheckbox from 'material-ui/Checkbox';

const Checkbox = ({ checked, onChange, label, ...rest }) => (
  <FormControlLabel
  control={
    <LibCheckbox checked={checked}
      onChange={e => onChange({ target: { value: e.target.checked } })}
      color="primary"
      {...rest} />
  }
  label={label} />
);

export default Checkbox;
