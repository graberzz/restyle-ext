import React from 'react';
import Button from '../BasicInputs/Button';
import Save from 'material-ui-icons/Save';
import { setStyle, getDefaultStyle } from '../../helpers/utils';
import storageManager from '../../helpers/storageManager';

export default class SaveStylesButton extends React.Component {
    onClick = () => {
        console.log(storageManager._accumulatedStyles);
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={<Save />}
                    text={'Hide node'}
            />
        )
    }
}