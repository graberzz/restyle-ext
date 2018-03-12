const messages = {
	EDIT_MODE_ON: 'EDIT_MODE_ON',
	EDIT_MODE_OFF: 'EIT_MODE_OFF',
	KEYBOARD_TOGGLE: 'KEYBOARD_TOGGLE',
};

const getDefaultStyle = node => getComputedStyle(node);

const setStyle = (node, style) => Object.entries(style).
								  	forEach(([key, value]) => (node.style[key] = value));


export {
	messages,
	getDefaultStyle,
	setStyle,
}