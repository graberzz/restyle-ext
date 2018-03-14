import { render } from 'react-dom';
import React from 'react';
import Mounter from './helpers/mounter';
import NodeSelector from './helpers/nodeSelector';
import Root from './components';
import { messages } from './helpers/utils';
import '../css/injected.css';

const SHORTCUT = 'KeyQ';

const onNodeSelect = node => {
	Mounter.mount(node, <Root node={node}/>);
}


const nodeSelector = NodeSelector(document.body,
								  onNodeSelect,  
								  node => node.closest('.editpage__wrap') ||
									      node.classList.contains('editpage__wrap')
);

chrome.runtime.onMessage.addListener(({msg}) => {
    switch(msg) {
    	case messages.EDIT_MODE_ON:
    		nodeSelector.enable();
    	break;

    	case messages.EDIT_MODE_OFF:
    		nodeSelector.disable();
    		Mounter.unmount();
    	break;

    	case messages.EDIT_MODE_TOGGLE: 
    	break;
    }
});

document.addEventListener('keyup', function(e) {
    if (!e.ctrlKey || e.code !== SHORTCUT) return;

    chrome.runtime.sendMessage({
    	msg: messages.EDIT_MODE_TOGGLE 
    });
});