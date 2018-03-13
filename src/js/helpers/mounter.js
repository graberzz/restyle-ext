import React from 'react';
import ReactDOM from 'react-dom';
import { setStyle } from './utils';
import { OUTLINE_WIDTH } from './utils';

const setPosition = (nodeToPos, relatedNode) => {
	const relatedNodeRect = relatedNode.getBoundingClientRect();

	if (relatedNodeRect.x + nodeToPos.getBoundingClientRect().width > window.innerWidth){
		nodeToPos.style.right = '0px';
		nodeToPos.style.left = null;
	}
	else {
		nodeToPos.style.left = `${relatedNodeRect.x}px`;
		nodeToPos.style.right = null;
	}

	nodeToPos.style.top = relatedNodeRect.y + relatedNodeRect.height + OUTLINE_WIDTH + 'px';
}

const Mounter = {
	wrap: document.createElement('div'),
	component: null,

	mount(node, component) {
		this.unmount();
		this.wrap.className = 'editpage__wrap';
		
		document.body.appendChild(this.wrap);
		ReactDOM.render(component, this.wrap);

		setPosition(this.wrap, node);
	},

	unmount() {
		if (document.body.contains(this.wrap)) {
			ReactDOM.unmountComponentAtNode(this.wrap);
			document.body.removeChild(this.wrap);
		}
	}
};

export default Mounter;