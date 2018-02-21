import init, { deinit } from './core/init';
import '../css/content.css';

let editModeActive = false;
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
 	editModeActive = !editModeActive;

    if (editModeActive) {
        init();
        // TODO: highlight each block with red border
    }
    else {
        deinit();
        // TODO: dehighlight NIKITA DELAI DEPLOM
    }
});