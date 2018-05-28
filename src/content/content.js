import React from 'react';
import Mounter from '../utils/mounter';
import ThemeInjector from '../utils/themeInjector';
import { messages, CONTAINER_ID } from '../utils';
import Editor from './components/Editor';
import './style.css';
import { Themes } from '../utils/storage';
/* globals chrome */

ThemeInjector.injectSuitable();

window.addEventListener('message', (e) => {
  if (e.data === 'GET_INSTALLED_THEMES') {
    Themes.get().then(themes => window.postMessage({
      msg: 'RESTYLE_THEMES',
      payload: themes,
    }, '*'));
  }
});

chrome.runtime.onMessage.addListener(({ msg, themeId }) => {
  switch (msg) {
    case messages.EDIT_MODE_ON:
      if (Number.isInteger(themeId)) {
        Themes.get(themeId)
          .then((theme) => {
            ThemeInjector.eject(theme);
            Mounter.mount(document.body, <Editor REtheme={theme} editing={true} />);
          });
      } else {
        Mounter.mount(document.body, <Editor />);
      }

      break;

    case messages.EDIT_MODE_OFF:
      Mounter.unmount();
      break;

    case messages.REINJECT:
      ThemeInjector.clear();
      ThemeInjector.injectSuitable();
      break;

    default: throw new Error(`Unhandled message: ${msg}`);
  }
});
