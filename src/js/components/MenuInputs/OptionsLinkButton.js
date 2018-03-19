import React from 'react';
import Button from '../BasicInputs/Button';
import Settings from 'material-ui-icons/Settings';
import { messages } from '../../helpers/utils';

export default class SaveStylesButton extends React.Component {
    onClick = () => {
        chrome.runtime.sendMessage({
            msg: messages.OPTIONS_OPEN
        });
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={<Settings />}
                    text={'Settings'}
            />
        )
    }
}