import React from 'react';
import Button from '../BasicInputs/Button';
import Loop from 'material-ui-icons/Loop';
import { setStyle, getDefaultStyle } from '../../helpers/utils';
import storageManager from '../../helpers/storageManager';
import notify, { notifyTypes } from '../../helpers/notify';

export default class ResetStylesButton extends React.Component {
    onClick = () => {
        console.log(storageManager._accumulatedStyles);
        storageManager.clear();
        notify({
            text: 'Styles have been reset, reload the page',
            type: notifyTypes.SUCCESS,
        })
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={<Loop />}
                    text={'Reset styles'}
            />
        )
    }
}