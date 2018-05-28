import React from 'react';
import LibSelect from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const renderOptions = options => options.map((option, i) => {
  if (typeof option === 'string') {
    return <option key={i} value={option}>{option}</option>;
  }
  return <option key={i} value={option.value}>{option.name}</option>;
});

const Select = ({ value, options, onChange, label, ...rest }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <LibSelect native defaultValue={value} onChange={onChange} {...rest}>
      {renderOptions(options)}
    </LibSelect>
  </FormControl>
);

export default Select;
