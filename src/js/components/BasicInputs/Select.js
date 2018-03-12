import React from 'react';
import MaterialSelect from 'material-ui/Select';

const Select = ({options, value, onChange}) => (
    <MaterialSelect native value={value} onChange={onChange}>
        {
            options.map((op, i) => <option key={i} value={op}>{op}</option>)
        }
    </MaterialSelect>
);

export default Select;