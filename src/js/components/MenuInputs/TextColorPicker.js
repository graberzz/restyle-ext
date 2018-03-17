import React from 'react';
import { getDefaultStyle, setStyle, rgbToHex } from '../../helpers/utils';
import { SketchPicker } from 'react-color';
import ToggleButton from '../BasicInputs/ToggleButton';
import TextFormat from 'material-ui-icons/TextFormat';

export default class TextColorPicker extends React.Component {
    constructor({node}) {
        super();
        const color = getDefaultStyle(node).color;
        const hexed = rgbToHex(color);
        this.state = {
            open: false,
            color: hexed === '' ?
                   color : hexed,
        }
    }
    onChange = ({hex: color}) => {
        this.setState({
            color
        });

        setStyle(this.props.node, {
            color
        }, true, true);
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
                    text="Color"
                    toggled={open}
                    onClick={this.onClick}
                    className="editpage__color-picker-icon"
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