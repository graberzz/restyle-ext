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

const rgbToHex = rgb => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
};

const getDefaultStyle = node => getComputedStyle(node);

const getClassSelector = node => node.tagName.toLowerCase() + 
                                (node.classList.length > 0 ? '.' + [...node.classList].join('.') : '') + 
                                ((node.id.toString() !== '') && node.classList.length === 0 ? '#' + node.id : '');

const getParentClassSelector = function (node) {
    let parent = node
    let parentString = getClassSelector(parent)
    while (parent.parentElement.children.length < 2) {
        parent = parent.parentElement
        parentString = getClassSelector(parent) + " " + parentString
    }
    return parentString
} 

const setStyle = (node, style, addToStorage = false, applytoAll) => {    
    Object.entries(style).forEach(([key, value]) => (node.style[key] = value));
    applytoAll = applytoAll || false;

    if (applytoAll) {
        const nodes = document.querySelectorAll(getParentClassSelector(node));
        for (let n of nodes) {
            Object.entries(style).forEach(([key, value]) => (n.style[key] = value));
        }
    }

    if (!addToStorage) return;

    style = {
        [getParentClassSelector(node)]: {
            attributes: Object.entries(style).reduce((obj, [k, v]) => { obj[formatToCSSProp(k)] = v;
                                                                        return obj;
                                                                      }, {}),
            children: {}
        } 
    };

    storageManager.accumulateStyles(style);
}

export {
	messages,
	getDefaultStyle,
    setStyle,
    getClassSelector,
    getParentClassSelector,
    rgbToHex,
    OUTLINE_WIDTH,
}