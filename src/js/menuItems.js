import React from 'react';
import TextAlignSelect from './components/MenuInputs/TextAlignSelect';
import TextFormat from 'material-ui-icons/TextFormat';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';

const menuItems = (node) => ([
    {
        icon: <TextFormat />,
        text: 'text',
        components: [
            {
                text: 'text Align',
                icon: <FormatAlignLeft />,
                component: <TextAlignSelect node={node}/>
            }
        ]
    }
]);

export default menuItems;