chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray) {
        let activeTab = tabArray[0].id;
        console.log(activeTab);

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

        chrome.tabs.onActivated.addListener(function(newTab) {
            console.log(`OLD TAB: ${activeTab}   ||| NEW TAB: ${newTab.tabId}`)
            if (editModeActive) {
                chrome.tabs.sendMessage(activeTab, {text: 'deactivate'});
                chrome.browserAction.setIcon({path: 'icon-34.png'});
                editModeActive = false;
            }

            activeTab = newTab.tabId;
        });
    }
  )