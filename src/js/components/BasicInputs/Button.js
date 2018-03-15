import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton'

const Button = ({onClick, icon, text, color}) => (
    <Tooltip title={text}>
        <IconButton onClick={onClick}
                    style={{color}}>
            {icon}  
        </IconButton>
    </Tooltip>
);

export default Button;