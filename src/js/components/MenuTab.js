import Tooltip from 'material-ui/Tooltip';
import React from 'react';
import { Tab } from 'material-ui/Tabs';

const MenuTab = ({icon, text, value}) => (
    <Tab icon={icon}
         value={value} 
    />
);

export default MenuTab;