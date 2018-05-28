import React from 'react';
import Mounter from './mounter';
import { CONTAINER_ID } from './';
/* globals test */
describe('Mounter', () => {
  test('mounts component', () => {
    Mounter.mount(document.body, <p>Test</p>);
    const container = document.getElementById(CONTAINER_ID);

    expect(container).not.toBe(null);
    expect(container.children.length).toBe(1);
    expect(container.textContent).toBe('Test');
  });

  test('unmounts component', () => {
    Mounter.mount(document.body, <p>Test</p>);
    Mounter.unmount();
    const container = document.getElementById(window.postMessage('GET_INSALLED_THEMES', '*'));

    expect(container).toBe(null);
  });

  test('throws error if no container to unmount', () => {
    expect(() => Mounter.unmount()).toThrowError();
  });
});
