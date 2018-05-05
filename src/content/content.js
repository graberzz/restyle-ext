import React from 'react';
import Mounter from '../utils/mounter';
import { messages, CONTAINER_ID } from '../utils';
import Editor from './components/Editor';
import './style.css';
/* globals chrome */

const mounter = Mounter(CONTAINER_ID);

chrome.runtime.onMessage.addListener(({ msg, theme }) => {
  switch (msg) {
    case messages.EDIT_MODE_ON:
      mounter.mount(document.body, <Editor theme={theme} />);
      break;

    case messages.EDIT_MODE_OFF:
      mounter.unmount();
      break;

    default: throw new Error(`Unhandled message: ${msg}`);
  }
});
