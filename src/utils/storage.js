/* global chrome */

export const getThemes = () => new Promise((res, rej) => {
  chrome.storage.sync.get(['themes'], res);
});