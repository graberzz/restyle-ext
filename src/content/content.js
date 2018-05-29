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
  switch (e.data.msg) {
    case 'RESTYLE_GET_INSALLED_THEMES':
      Themes.get().then(themes => window.postMessage({
        msg: 'RESTYLE_THEMES',
        themes,
      }, '*'));
      break;

    case 'RESTYLE_INSTALL_THEME':
      Themes.add(e.data.theme);
      break;

    case 'RESTYLE_UNINSTALL_THEME':
      Themes.delete(e.data.id);
      break;
    default:
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
