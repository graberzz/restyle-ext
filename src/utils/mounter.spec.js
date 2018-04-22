import React from 'react';
import Mounter from './mounter';
/* globals test */
const mounter = Mounter('TESTCASE');
describe('mounter', () => {
  test('mounts component', () => {
    mounter.mount(document.body, <p>Test</p>);
    const container = document.getElementById('TESTCASE');

    expect(container).not.toBe(null);
    expect(container.children.length).toBe(1);
    expect(container.textContent).toBe('Test');
  });

  test('unmounts component', () => {
    mounter.mount(document.body, <p>Test</p>);
    mounter.unmount();
    const container = document.getElementById('TESTCASE');

    expect(container).toBe(null);
  });

  test('throws error if no container to unmount', () => {
    expect(() => mounter.unmount()).toThrowError();
  });
});
