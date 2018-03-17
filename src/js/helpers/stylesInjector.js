import CSSJSON from '../lib/cssjson';
import storageManager from './storageManager';

const injectStyles = (url) => {
    storageManager.getStylesheet((err, stylesheet) => {
        if (err) console.log(err);
        document.head.appendChild(CSSJSON.toHEAD(CSSJSON.toCSS(err.styles[url])));
        storageManager.clearStorage();
    }, url);
}
export default injectStyles;