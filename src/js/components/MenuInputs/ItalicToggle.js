import React from 'react';
import ToggleButton from '../BasicInputs/ToggleButton';
import FormatItalic from 'material-ui-icons/FormatItalic';
import { setStyle, getDefaultStyle } from '../../utils';

export default class ItalicToggle extends React.Component {
    state = {
        toggled: getDefaultStyle(this.props.node).fontStyle === 'italic'
    }

    onClick = () => {
        const toggled = !this.state.toggled;
        
        this.setState(_ => ({
            toggled
        }));

        setStyle(this.props.node, {
            fontStyle: toggled ? 'italic' : 'normal'
        });
    }

    render() {
        const { toggled } = this.state; 
        return (
            <ToggleButton
                onClick={this.onClick}
                toggled={toggled}
                icon={<FormatItalic />}
                text="Italic"
            />
        )
    }
}