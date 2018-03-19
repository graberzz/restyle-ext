import React from 'react';
import Button from '../BasicInputs/Button';
import Delete from 'material-ui-icons/Delete';
import { setStyle, getDefaultStyle } from '../../helpers/utils';

export default class DeleteNodeButton extends React.Component {
    onClick = () => {
        setStyle(this.props.node, {
            display: 'none'
        }, true, true);
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={<Delete />}
                    text={'Delete'}
            />
        )
    }
}