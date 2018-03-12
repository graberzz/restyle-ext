import Mounter from './Menu';
import React from 'react';
import NodeSelector from './nodeSelector';
import { messages } from './utils';
import '../css/injected.css';

const SHORTCUT = 'KeyQ';
;

const onNodeSelect = node => {
	Mounter.mount(node, <h1>Hello, WORLD!</h1>);
}

const nodeSelector = NodeSelector(onNodeSelect);

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