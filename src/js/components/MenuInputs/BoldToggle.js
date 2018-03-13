import React from 'react';
import ToggleButton from '../BasicInputs/ToggleButton';
import FormatBold from 'material-ui-icons/FormatBold';
import { setStyle, getDefaultStyle } from '../../helpers/utils';

export default class BoldToggle extends React.Component {
    state = {
        toggled: getDefaultStyle(this.props.node).fontWeight != 400
    }

    onClick = () => {
        const toggled = !this.state.toggled;
        
        this.setState(_ => ({
            toggled
        }));

        setStyle(this.props.node, {
            fontWeight: toggled ? 'bold' : 'normal'
        });
    }

    render() {
        const { toggled } = this.state; 
        return (
            <ToggleButton
                onClick={this.onClick}
                toggled={toggled}
                icon={<FormatBold />}
                text="Bold"
            />
        )
    }
}