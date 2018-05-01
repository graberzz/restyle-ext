import React from 'react';
import { FormControlLabel } from 'material-ui/Form';
import LibCheckbox from 'material-ui/Checkbox';

const Checkbox = ({ checked, onChange, label }) => (
  <FormControlLabel
  control={
    <LibCheckbox checked={checked}
      onChange={onChange}
      color="primary"
      value="vlaue" />
  }
  label={label} />
);

export default Checkbox;
