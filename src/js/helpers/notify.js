import React from 'react';
import { render } from 'react-dom';
import Snackbar from 'material-ui/Snackbar';

export const notifyTypes = {
    ERROR: 'ERROR',
    SUCCESS: 'SUCCESS',
};

const styles = {
    [notifyTypes.ERROR]: {
        color: 'red'
    },
    [notifyTypes.SUCCESS]: {
        color: 'lime'
    }
};

class Notification extends React.Component {
    state = {
        open: true
    }

    onClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <Snackbar
                anchorOrigin={{ vertical: "top" , horizontal: "right" }}
                open={this.state.open}
                onClose={this.onClose}
                autoHideDuration={3000}
                message={<span style={styles[this.props.type]}>{this.props.text}</span>}
           /> 
        )
    }
}

const notify = ({text, type}) => {
    const wrap = document.createElement('div');
    document.body.appendChild(wrap);
    render(<Notification type={type} text={text} />, wrap);
    setTimeout(() => document.body.removeChild(wrap), 4000);
}

export default notify;