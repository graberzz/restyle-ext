import CSSJSON from '../lib/cssjson';
import storageManager from './storageManager';

const injectStyles = (url) => {
    storageManager.getStylesheet((style) => {
        console.log(style);
        if (!style) return;
        if (!style.styles) return;
        if (!style.styles[url]) return;

        console.log(CSSJSON.toHEAD(CSSJSON.toCSS(style.styles[url])));
    });
}
export default injectStyles;