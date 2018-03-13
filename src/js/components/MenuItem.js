import React from 'react';
import Tooltip from 'material-ui/Tooltip';

const MenuItem = ({icon, text, input}) => (
    <div className="editpage__menuitem">
        {
            icon ? <Tooltip title={text}>
                    { icon }
                </Tooltip> : null
        }
        
        { input }
    </div>
)

export default MenuItem;