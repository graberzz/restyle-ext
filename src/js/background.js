let editModeActive = false;

chrome.browserAction.onClicked.addListener(function (tab) {
    editModeActive = !editModeActive;

    if (editModeActive) {
        chrome.tabs.sendMessage(tab.id, {text: 'activate'});
        chrome.browserAction.setIcon({path: 'icon-34-active.png'});
    } else {
        chrome.tabs.sendMessage(tab.id, {text: 'deactivate'});
        chrome.browserAction.setIcon({path: 'icon-34.png'});
    }    
});