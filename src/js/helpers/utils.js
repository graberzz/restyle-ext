import storageManager from './storageManager';

const OUTLINE_WIDTH = 2;
const messages = {
	EDIT_MODE_ON: 'EDIT_MODE_ON',
	EDIT_MODE_OFF: 'EIT_MODE_OFF',
};

const formatToCSSProp = prop => {
    return prop.replace(/([A-Z])/g, function (match, upperCase) {
        return '-' + upperCase.toLowerCase();
    });
}

const getDefaultStyle = node => getComputedStyle(node);

const getClassSelector = node => node.tagName.toLowerCase() + (node.classList.length > 0 ? 
                                                              '.' + [...node.classList].join('.') :
                                                              '');

const setStyle = (node, style) => {
    Object.entries(style).forEach(([key, value]) => (node.style[key] = value));

    style = {
        [getClassSelector(node)]: {
            attributes: Object.entries(style).reduce((obj, [k, v]) => { obj[formatToCSSProp(k)] = v;
                                                                        return obj;
                                                                      }, {})
        } 
    };
    //storageManager.accumulateStyles(location.origin, style);
    console.log(style);
    return style;
}

export {
	messages,
	getDefaultStyle,
	setStyle,
    OUTLINE_WIDTH,
}