import CSSJSON from '../lib/cssjson';
import storageManager from './storageManager';

const injectStyles = (url) => {
    storageManager.getStylesheet((err, stylesheet) => {
        if (err) console.log(err);

        CSSJSON.toHEAD(stylesheet);
    }, url);
}
export default injectStyles;