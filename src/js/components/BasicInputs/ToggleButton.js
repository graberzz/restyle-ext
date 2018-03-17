import React from 'react';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton'

const ToggleButton = ({toggled, onClick, icon, text, color, className}) => {
    let classes = !toggled ? 
                  'editpage__toggleBtn--off' :
                  ''; 
    classes += className ?
               ' ' + className :
               '';   

    return (
    <Tooltip title={text}>
        <IconButton className={classes}
                    onClick={onClick}
                    style={{color}}>
            {icon}  
        </IconButton>
    </Tooltip>
    )
};

export default ToggleButton;