import React from 'react';
import TextAlignSelect from './components/MenuInputs/TextAlignSelect';
import TextFields from 'material-ui-icons/TextFields';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';
import BoldToggle from './components/MenuInputs/BoldToggle';
import ItalicToggle from './components/MenuInputs/ItalicToggle';
import TextColorPicker from './components/MenuInputs/TextColorPicker';

const menuItems = (node) => ([
    {
        icon: <TextFields />,
        text: 'text',
        components: [
            {
                component: <TextAlignSelect node={node} />
            },
            {
                component: <BoldToggle node={node} />
            },
            {
                component: <ItalicToggle node={node} />
            },
            {
                component: <TextColorPicker node={node} />
            },
        ]
    }
]);

export default menuItems;