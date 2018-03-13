import React from 'react';
import TextAlignSelect from './components/MenuInputs/TextAlignSelect';
import TextFields from 'material-ui-icons/TextFields';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';
import BoldToggle from './components/MenuInputs/BoldToggle';
import ItalicToggle from './components/MenuInputs/ItalicToggle';
import TextColorPicker from './components/MenuInputs/TextColorPicker';
import BackgroundColorPicker from './components/MenuInputs/BackgroundColorPicker';
import FontSizeSelect from './components/MenuInputs/FontSizeSelect';
import FontFamilySelect from './components/MenuInputs/FontFamilySelect';

const menuItems = (node) => ([
    {
        icon: <TextFields />,
        text: 'text',
        components: [
            {
                component: <FontFamilySelect node={node} />
            },
            {
                component: <FontSizeSelect node={node} />
            },
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
            {
                component: <BackgroundColorPicker node={node} />
            },
        ]
    }
]);

export default menuItems;