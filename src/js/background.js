import { messages } from './utils';

const icons = {
    default: 'img/icon-34.png',
    active: 'img/icon-34-active.png'
};

const setIcon = icon => chrome.browserAction.setIcon({path: icon});
const sendMsg = (tabId, msg) => chrome.tabs.sendMessage(tabId, {msg});

const init = ([currentTab]) => {
    let activeTabId = currentTab.id,
        editMode = false;

    const toggleEditMode = tabId => {
        editMode = !editMode;
        
        const icon = editMode ?
                     icons.active :
                     icons.default;

        const msg = editMode ?
                    messages.EDIT_MODE_ON :
                    messages.EDIT_MODE_OFF;

        sendMsg(tabId, msg);
        setIcon(icon);
    }

    const onIconClick = ({id}) => toggleEditMode(id);

    const onMessage = ({msg}, {tab}) => {
        switch (msg) {
            case messages.KEYBOARD_TOGGLE:
                toggleEditMode(tab.id);
            break;
        }
    }

    const onTabSwitch = newTab => {
        if (editMode) {
            toggleEditMode(activeTabId);
        }
        activeTabId = newTab.id;
    }

    chrome.browserAction.onClicked.addListener(onIconClick);
    chrome.runtime.onMessage.addListener(onMessage);
    chrome.tabs.onActivated.addListener(onTabSwitch);
}

chrome.tabs.query(
    {
        currentWindow: true,
        active : true
    },
    init);