import React from 'react';
import TextAlignSelect from './components/MenuInputs/TextAlignSelect';
import TextFields from 'material-ui-icons/TextFields';
import FormatAlignLeft from 'material-ui-icons/FormatAlignLeft';
import Save from 'material-ui-icons/Save';
import CropSquare from 'material-ui-icons/CropSquare';
import BoldToggle from './components/MenuInputs/BoldToggle';
import ItalicToggle from './components/MenuInputs/ItalicToggle';
import TextColorPicker from './components/MenuInputs/TextColorPicker';
import BackgroundColorPicker from './components/MenuInputs/BackgroundColorPicker';
import FontSizeSelect from './components/MenuInputs/FontSizeSelect';
import FontFamilySelect from './components/MenuInputs/FontFamilySelect';
import SaveAsPNGButton from './components/MenuInputs/SaveAsPNGButton';
import HideNodeButton from "./components/MenuInputs/HideNodeButton";
import DeleteNodeButton from "./components/MenuInputs/DeleteNodeButton";
import SaveStylesButton from './components/MenuInputs/SaveStylesButton';
import ResetStyleButton from './components/MenuInputs/ResetStylesButton';
import LineHeightSelect from './components/MenuInputs/LineHeightSelect';
import OptionsLinkButton from './components/MenuInputs/OptionsLinkButton';

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
                component: <LineHeightSelect node={node} />
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
        ]
    },
    {
        icon: <CropSquare />,
        components: [
            {
                component: <BackgroundColorPicker node={node} />
            },
            {
                component: <HideNodeButton node={node} />
            },
            {
                component: <DeleteNodeButton node={node} />
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
                component: <SaveStylesButton node={node} />
            },
            {
                component: <ResetStyleButton node={node} />
            },
            {
                component: <OptionsLinkButton node={node} />
            }
        ]
    }
]);

export default menuItems;