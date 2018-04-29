import React from 'react';
import NodeSelector from '../utils/nodeSelector';
import Mounter from '../utils/mounter';
import { messages } from '../utils';
import Editor from './components/Editor';
import './style.css';
/* globals chrome */

const mounter = Mounter();

chrome.runtime.onMessage.addListener(({ msg }) => {
  switch (msg) {
    case messages.EDIT_MODE_ON:
      mounter.mount(document.body, <Editor />);
      break;

    case messages.EDIT_MODE_OFF:
      mounter.unmount();
      break;

    default: throw new Error(`Unhandled message: ${msg}`);
  }
});
