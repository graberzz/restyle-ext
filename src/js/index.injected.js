import { render } from 'react-dom';
import React from 'react';
import Mounter from './helpers/mounter';
import NodeSelector from './helpers/nodeSelector';
import Root from './components';
import { messages } from './helpers/utils';
import injectStyles from './helpers/stylesInjector';
import '../css/injected.css';

injectStyles(location.origin);

const onNodeSelect = (prevNode, node) => {
	Mounter.mount(node, <Root node={node}/>);
	if (prevNode) {
		prevNode.setAttribute('contenteditable', false);
	}
	node.setAttribute('contenteditable', true);
};

const nodeSelector = NodeSelector(document.body,
								  onNodeSelect,  
								  node => node.closest('.editpage__wrap') ||
									      node.classList.contains('editpage__wrap',)
);

chrome.runtime.onMessage.addListener(({msg}) => {
    switch(msg) {
    	case messages.EDIT_MODE_ON:
    		nodeSelector.enable();
    	break;

		case messages.EDIT_MODE_OFF:
			if (nodeSelector.selectedNode) {
				nodeSelector.selectedNode.setAttribute('contenteditable', false);
			}
			nodeSelector.disable();
    		Mounter.unmount();
    	break;
    }
});