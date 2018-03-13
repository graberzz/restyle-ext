import React from 'react';
import { getDefaultStyle, setStyle } from '../../utils';
import { SketchPicker } from 'react-color';
import ToggleButton from '../BasicInputs/ToggleButton';
import FormatColorFill from 'material-ui-icons/FormatColorFill';

export default class BackgroundColorPicker extends React.Component {
    state = {
        open: false,
        color: getDefaultStyle(this.props.node).backgroundColor
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