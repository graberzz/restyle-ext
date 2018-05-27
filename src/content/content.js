import React from 'react';
import Mounter from '../utils/mounter';
import ThemeInjector from '../utils/themeInjector';
import { messages, CONTAINER_ID } from '../utils';
import Editor from './components/Editor';
import './style.css';
import { Themes } from '../utils/storage';
/* globals chrome */

ThemeInjector.injectSuitable();

const mounter = Mounter(CONTAINER_ID);

chrome.runtime.onMessage.addListener(({ msg, themeId }) => {
  switch (msg) {
    case messages.EDIT_MODE_ON:
      if (Number.isInteger(themeId)) {
        Themes.get(themeId)
          .then((theme) => {
            mounter.mount(
              document.body,
              <Editor REtheme={theme} editing={true} />,
            );
          });
      } else {
        mounter.mount(
          document.body,
          <Editor />,
        );
      }

      break;

    case messages.EDIT_MODE_OFF:
      mounter.unmount();
      break;

    case messages.REINJECT:
      ThemeInjector.clear();
      ThemeInjector.injectSuitable();
      break;

    default: throw new Error(`Unhandled message: ${msg}`);
  }
});
