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

const getClassSelector = node => node.tagName.toLowerCase() + (node.classList.length > 0 ? 
                                                              '.' + [...node.classList].join('.') :
                                                              '');

const setStyle = (node, style, addToStorage = false) => {
    Object.entries(style).forEach(([key, value]) => (node.style[key] = value));
    if (!addToStorage) return;

    style = {
        [getClassSelector(node)]: {
            attributes: Object.entries(style).reduce((obj, [k, v]) => { obj[formatToCSSProp(k)] = v;
                                                                        return obj;
                                                                      }, {})
        } 
    };
    storageManager.accumulateStyles(style);
}

export {
	messages,
	getDefaultStyle,
    setStyle,
    getClassSelector,
    rgbToHex,
    OUTLINE_WIDTH,
}