import Tooltip from 'material-ui/Tooltip';
import React from 'react';
import { Tab } from 'material-ui/Tabs';

const menuTabStyles = {
    fontSize: '.7em',
}

const MenuTab = ({icon, text, value}) => (
    <Tab icon={icon}
         value={value} 
         styles={menuTabStyles} />
);

export default MenuTab;