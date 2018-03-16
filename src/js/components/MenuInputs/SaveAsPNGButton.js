import React from 'react';
import Button from '../BasicInputs/Button';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import domtoimage from 'dom-to-image';

export default class SaveAsPNGButton extends React.Component {
    onClick = () => {
        domtoimage.toBlob(this.props.node)
            .then(imgBlob => {
                const imgURL = URL.createObjectURL(imgBlob);

                const link = document.createElement('a');
                link.href = imgURL;
                link.target = '_blank';
                link.click();
            })
            .catch(err => {
                console.log('error while saving as png: ' + err);
            })
    }

    render() { 
        return (
            <Button onClick={this.onClick}
                    icon={<PhotoCamera />}
                    text={'Save as PNG'}
            />
        )
    }
}