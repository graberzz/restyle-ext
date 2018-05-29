import React from 'react';
import { render } from 'react-dom';
import Editor from './components/Editor';

setInterval(() => {
  window.top.postMessage(document.body.scrollHeight, '*');
}, 500);

const container = document.getElementById('container');

render(<Editor />, container);
