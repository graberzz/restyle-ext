import React from 'react';
import { getDefaultStyle, setStyle } from '../../utils';
import { SketchPicker } from 'react-color';
import ToggleButton from '../BasicInputs/ToggleButton';
import TextFormat from 'material-ui-icons/TextFormat';

export default class TextColorPicker extends React.Component {
    state = {
        open: false,
        color: getDefaultStyle(this.props.node).color
    }

    onChange = ({hex: color}) => {
        this.setState({
            color
        });

        setStyle(this.props.node, {
            color
        });
    }

    onClick = () => {
        this.setState(prevState => ({
            open: !prevState.open,
        }))
    }

    render() {
        const { color, open } = this.state;
         
        return (
            <div>
                <ToggleButton 
                    icon={<TextFormat />}
                    color={color}
                    text="Text Color"
                    toggled={open}
                    onClick={this.onClick}
                />
                {
                    open ? 
                    <SketchPicker
                        className="editpage__colorpicker"
                        color={color}
                        onChange={this.onChange} /> : 
                    null
                }
            </div>
        )
    }
}