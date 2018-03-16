import CSSJSON from '../lib/cssjson';
import storageManager from './storageManager';

const injectStyles = (url) => {
    storageManager.getStylesheet(url, (err, stylesheet) => {
        if (err) console.log(err);

        CSSJSON.toHEAD(stylesheet);
    });
}
export default injectStyles;