let editModeActive = false;

function switchMode(tab) {
    editModeActive = !editModeActive;

    if (editModeActive) {
        chrome.tabs.sendMessage(tab.id, {text: 'activate'});
        chrome.browserAction.setIcon({path: 'icon-34-active.png'});
    } else {
        chrome.tabs.sendMessage(tab.id, {text: 'deactivate'});
        chrome.browserAction.setIcon({path: 'icon-34.png'});
    } 
}

chrome.browserAction.onClicked.addListener(function (tab) {   
    switchMode(tab);
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) { 
    if (req.mes === 'keyboard') {
        switchMode(sender.tab);
    }
});