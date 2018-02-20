import init from './core/init';
import '../css/content.css';

let editModeActive = false;
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
//	editModeActive = !editModeActive;

    init();
});