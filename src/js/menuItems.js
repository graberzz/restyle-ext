import React from 'react';
import TextAlignSelect from './components/MenuInputs/TextAlignSelect';
import TextFields from 'material-ui-icons/TextFields';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';
import Save from 'material-ui-icons/Save';
import BoldToggle from './components/MenuInputs/BoldToggle';
import ItalicToggle from './components/MenuInputs/ItalicToggle';
import TextColorPicker from './components/MenuInputs/TextColorPicker';
import BackgroundColorPicker from './components/MenuInputs/BackgroundColorPicker';
import FontSizeSelect from './components/MenuInputs/FontSizeSelect';
import FontFamilySelect from './components/MenuInputs/FontFamilySelect';
import SaveAsPNGButton from './components/MenuInputs/SaveAsPNGButton';
import HideNodeButton from "./components/MenuInputs/HideNodeButton";
import SaveStylesButton from './components/MenuInputs/SaveStylesButton';
import ResetStyleButton from './components/MenuInputs/ResetStylesButton';
const menuItems = (node) => ([
    {
        icon: <TextFields />,
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
    },
    {
        icon: <Save />,
        components: [
            {
                component: <SaveAsPNGButton node={node} />
            },
            {
                component: <HideNodeButton node={node} />
            },
            {
                component: <SaveStylesButton node={node} />
            },
            {
                component: <ResetStyleButton node={node} />
            }
        ]
    }
]);

export default menuItems;