import React from 'react';
import Tooltip from 'material-ui/Tooltip';

const MenuItem = ({icon, text, input}) => (
    <div className="editpage__menuitem">
        <Tooltip title={text}>
            { icon }
        </Tooltip>
        { input }
    </div>
)

export default MenuItem;