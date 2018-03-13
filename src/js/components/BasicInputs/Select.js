import React from 'react';
import MaterialSelect from 'material-ui/Select';
import Tooltip from 'material-ui/Tooltip';

const Select = ({options, value, onChange, text}) => (
    <Tooltip title={text}>
        <MaterialSelect className='editpage__select' native value={value} onChange={onChange} autoWidth>
            {
                options.map((op, i) => <option key={i} value={op}>{op}</option>)
            }
        </MaterialSelect>
    </Tooltip>
);

export default Select;