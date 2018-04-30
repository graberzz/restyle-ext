import React from 'react';
import LibSelect from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const renderOptions = options => options.map((option) => {
  if (typeof option === 'string') {
    return <option value={option}>{option}</option>
  }
  return <option value={option.value}>{option.name}</option>
});

const Select = ({ value, options, onChange, label }) => (
  <FormControl>
    <InputLabel>{label}</InputLabel>
    <LibSelect native defaultValue={value} onChange={onChange}>
      {renderOptions(options)}
    </LibSelect>
  </FormControl>
);

export default Select;