import { getSelector, rgbToHex } from './';
import { ExpansionPanel } from 'material-ui';
/* global test, describe */

describe('getSelector func', () => {
  test('returns element selector for elem with no parent', () => {
    const node = document.createElement('div');
    expect(getSelector(node)).toBe('div');
  });

  test('selector includes parent for elem with parent', () => {
    const parent = document.createElement('div');
    const child = document.createElement('div');
    parent.appendChild(child);

    expect(getSelector(child)).toBe('div div');
  });

  test('selector includes classname for element with class', () => {
    const node = document.createElement('div');
    node.classList.add('class1');
    node.classList.add('class2');
    expect(getSelector(node)).toBe('div.class1.class2');
  });

  test('selector includes max 2 parents', () => {
    const grandparent = document.createElement('article');
    const parent = document.createElement('div');
    const child = document.createElement('p');
    grandparent.appendChild(parent);
    parent.appendChild(child);

    expect(getSelector(child)).toBe('article div p');
  });

  test('selector includes max 1 parent with class', () => {
    const parent = document.createElement('div');
    parent.className = 'className';
    const child = document.createElement('div');
    parent.appendChild(child);

    expect(getSelector(child)).toBe('div.className div');
  });

  test('selector includes max 1 parent with id', () => {
    const parent = document.createElement('div');
    parent.id = 'id';
    const child = document.createElement('div');
    parent.appendChild(child);

    expect(getSelector(child)).toBe('div#id div');
  });

  test('selector includes only id if elem has it', () => {
    const elem = document.createElement('div');
    elem.id = 'id';

    expect(getSelector(elem)).toBe('div#id');
  });
});

describe('rgbToHex func', () => {
  test('converts rgb to hex', () => {
    expect(rgbToHex('rgb(0, 0, 0)')).toBe('#000000');
    expect(rgbToHex('rgb(255, 255, 255)')).toBe('#ffffff');
    expect(rgbToHex('rgb(66, 134, 244)')).toBe('#4286f4');
    expect(rgbToHex('rgba(255, 255, 255, .7)')).toBe('#ffffff');
  });

  test('handles edge cases', () => {
    expect(rgbToHex('#000')).toBe('');
    expect(rgbToHex('#ffffff')).toBe('');
    expect(rgbToHex(1337)).toBe('');
  });
});
