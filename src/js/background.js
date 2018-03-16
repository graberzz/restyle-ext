import { messages } from './helpers/utils';

const icons = {
    default: 'img/icon-34.png',
    active: 'img/icon-34-active.png'
};

const setIcon = icon => chrome.browserAction.setIcon({path: icon});
const sendMsg = (tabId, msg) => chrome.tabs.sendMessage(tabId, {msg});

const init = ([currentTab]) => {
    let activeTabId = currentTab.id,
        editMode = false;
    console.log("ACTIVETAB:", activeTabId);

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

    const onTabSwitch = ({tabId}) => {
        if (editMode) {
            toggleEditMode(activeTabId);
        }
        activeTabId = tabId;
    }

    chrome.browserAction.onClicked.addListener(onIconClick);
    chrome.tabs.onActivated.addListener(onTabSwitch);
}

chrome.tabs.query(
    {
        currentWindow: true,
        active : true
    },
    init);