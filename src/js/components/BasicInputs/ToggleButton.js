import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton'

const ToggleButton = ({toggled, onClick, icon, text, color}) => (
    <Tooltip title={text}>
        <IconButton className={!toggled ? 
                               'editpage__toggleBtn--off' :
                               ''}
                    onClick={onClick}
                    style={{color}}>
            {icon}  
        </IconButton>
    </Tooltip>
);

export default ToggleButton;