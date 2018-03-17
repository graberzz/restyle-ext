import React from 'react';
import { getDefaultStyle, setStyle, rgbToHex } from '../../helpers/utils';
import { SketchPicker } from 'react-color';
import ToggleButton from '../BasicInputs/ToggleButton';
import FormatColorFill from 'material-ui-icons/FormatColorFill';

export default class BackgroundColorPicker extends React.Component {
    constructor({node}) {
        super();
        const bgColor = getDefaultStyle(node).backgroundColor;
        const hexed = rgbToHex(bgColor);
        this.state = {
            open: false,
            color: hexed === '' ?
                   bgColor : hexed,
        }
    }

    onChange = ({hex: color}) => {
        this.setState({
            color
        });

        setStyle(this.props.node, {
            backgroundColor : color
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
                    icon={<FormatColorFill />}
                    color={color}
                    text="Background Color"
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