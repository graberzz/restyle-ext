import React from 'react';
import NodeSelector from '../utils/nodeSelector';
import Mounter from '../utils/mounter';
import { messages } from '../utils';
import ElementStateRadio from './components/ElementStateRadio';
import Editor from './components/Editor';
import './style.css';
/* globals chrome */

// injectStyles(location.origin);
const onNodeSelect = (prevNode, node) => {
  // ???
};

const mounter = Mounter();

const nodeSelector = NodeSelector(
  document.body,
  onNodeSelect,
  node => node.closest('.editpage__wrap') ||
    node.classList.contains('editpage__wrap'),
);

chrome.runtime.onMessage.addListener(({ msg }) => {
  switch (msg) {
    case messages.EDIT_MODE_ON:
      mounter.mount(document.body, <Editor />);
      break;

    case messages.EDIT_MODE_OFF:
      mounter.unmount();
      break;

    default: throw new Error('Unhandled message');
  }
});
