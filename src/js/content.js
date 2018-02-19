let editModeActive = false;
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	editModeActive = !editModeActive;

    document.body.style.backgroundColor = editModeActive ? 'red' : 'green';
});