const OUTLINE_WIDTH = 2;
const messages = {
  EDIT_MODE_ON: 'EDIT_MODE_ON',
  EDIT_MODE_OFF: 'EIT_MODE_OFF',
  OPTIONS_OPEN: 'OPTIONS_OPEN',
};

const units = [
  'px',
  '%',
  'em',
  'rem',
];


const formatToCSSProp = prop => prop.replace(/([A-Z])/g, (match, upperCase) => `-${upperCase.toLowerCase()}`);

/* eslint-disable */
const rgbToHex = (rgb) => {
  if (typeof rgb !== 'string') {
    rgb = '#' + rgb;
  }
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
};
/* eslint-enable */

const getDefaultStyle = node => getComputedStyle(node);

const getSelector = (node, depth = 0) => {
  let selector = node.tagName.toLowerCase();

  if (node.classList.length > 0) {
    selector += `.${[...node.classList].join('.')}`;
  }
  if (depth < 3 && node.parentElement) {
    selector = `${getSelector(node.parentElement, depth + 1)} ${selector}`;
  }
  return selector;
};


const setStyle = (node, style, addToStorage = false, applytoAll = false) => {
  Object.entries(style).forEach(([key, value]) => { node.style[key] = value; });

  if (applytoAll) {
    const nodesToApply = Array.from(document.querySelectorAll(getSelector(node)));
    nodesToApply.forEach(nodeToApply => Object.entries(style).forEach(([key, value]) => {
      nodeToApply.style[key] = value;
    }));
  }

  if (!addToStorage) return;

  style = {
    [getSelector(node)]: {
      attributes: Object.entries(style).reduce((obj, [k, v]) => {
        obj[formatToCSSProp(k)] = v;
        return obj;
      }, {}),
      children: {},
    },
  };

  // storageManager.accumulateStyles(style);
};

export {
  messages,
  units,
  getDefaultStyle,
  setStyle,
  getSelector,
  rgbToHex,
  OUTLINE_WIDTH,
};
