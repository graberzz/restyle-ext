import React from 'react';
import Button from '../BasicInputs/Button';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import VisibilityOn from 'material-ui-icons/Visibility';
import { setStyle, getDefaultStyle } from '../../helpers/utils';

export default class HideNodeButton extends React.Component {
    state = {
        visible: getDefaultStyle(this.props.node).visibility != 'hidden',
    }

    onClick = () => {
        this.setState({
            visible: !this.state.visible,
        }, () => {
            setStyle(this.props.node, {
                visibility: this.state.visible ? 'visible' : 'hidden'
            }, true, true);
        })
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={this.state.visible ? <VisibilityOn /> : <VisibilityOff />}
                    text={'Hide'}
            />
        )
    }
}