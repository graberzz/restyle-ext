import React from 'react';
import Button from '../BasicInputs/Button';
import PhotoCamera from 'material-ui-icons/PhotoCamera';
import domtoimage from 'dom-to-image';
import notify, { notifyTypes } from '../../helpers/notify';
import { setStyle, getClassSelector, getParentClassSelector, getDefaultStyle } from '../../helpers/utils';

const noStyle = {
    outlineStyle: 'none',
    outlineWidth: '0px',
    margin: '0px 0px 0px 0px'
};

export default class SaveAsPNGButton extends React.Component {
    state = {}

    onClick = () => {

        let savedMargin = getDefaultStyle(this.props.node).margin;
        setStyle(this.props.node, noStyle, false, false)

        domtoimage.toBlob(this.props.node)
            .then(imgBlob => {
                const imgURL = URL.createObjectURL(imgBlob);
                this.propsNode
                const link = document.createElement('a');
                link.href = imgURL;
                link.target = '_blank';
                link.click();
                setStyle(this.props.node, {
                    margin: savedMargin
                }, false, false)
            })
            .catch(err => {
                console.log('error while saving as png: ' + err);
                notify({
                    text: "Error while saving as PNG",
                    type: notifyTypes.ERROR,
                });
            })

        // this.props.node.style.margin = savedMargin;

        // console.log(this.props.node)
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