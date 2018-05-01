/* global chrome */
import { messages } from '../utils';

const icons = {
  default: 'icons/ReSTYLE_38.png',
  active: 'icons/ReSTYLE_active_38.png',
};

const setIcon = icon => chrome.browserAction.setIcon({ path: icon });
const sendMsg = (tabId, msg) => chrome.tabs.sendMessage(tabId, { msg });

const init = ([currentTab]) => {
  let activeTabId = currentTab.id;
  let editMode = false;

  const toggleEditMode = (tabId) => {
    editMode = !editMode;

    const icon = editMode ?
      icons.active :
      icons.default;

    const msg = editMode ?
      messages.EDIT_MODE_ON :
      messages.EDIT_MODE_OFF;

    sendMsg(tabId, msg);
    setIcon(icon);
  };

  const onIconClick = ({ id }) => toggleEditMode(id);

  const onMessage = ({ msg }) => {
    switch (msg) {
      case messages.OPTIONS_OPEN:
        chrome.runtime.openOptionsPage();
        break;
      default: break;
    }
  };


  const onTabSwitch = ({ tabId }) => {
    if (editMode) {
      toggleEditMode(activeTabId);
    }
    activeTabId = tabId;
  };

  // chrome.browserAction.onClicked.addListener(onIconClick);
  chrome.runtime.onMessage.addListener(onMessage);
  chrome.tabs.onActivated.addListener(onTabSwitch);
};

chrome.tabs.query(
  {
    currentWindow: true,
    active: true,
  },
  init,
);
