import init, { deinit } from './core/init';
import '../css/content.css';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    const editModeActive = msg.text === 'activate';

    if (editModeActive) {
        init();        
    } else {
        deinit();
    }
});

document.addEventListener('keyup', function(e) {
    if (!e.ctrlKey || e.code !== 'KeyQ') return;

    chrome.runtime.sendMessage({mes: 'keyboard' });
});