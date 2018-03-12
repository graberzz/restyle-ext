import React from 'react';

const style = {
	color: 'red',
};

const Select = ({ options, onChange, selected = 0 }) => (
  <select value={selected} onChange={onChange} style={style}>
    {options.map((opt, i) => <option value={opt}>{opt}</option>)}
  </select>
);

export default Select;