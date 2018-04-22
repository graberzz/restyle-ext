import NodeSelector from '../utils/nodeSelector';
/* global test, jest, describe */

describe('nodeSelector', () => {
  test('selects node', () => {
    const mockOnSelect = jest.fn();
    const root = document.createElement('div');
    const child = document.createElement('div');
    root.appendChild(child);
    const nodeSelector = NodeSelector(
      root,
      mockOnSelect,
      () => false,
      {},
      { outlineColor: 'blue' },
    );
    nodeSelector.enable();
    child.click();
    expect(mockOnSelect).toBeCalled();
    expect(child.style.outlineColor).toBe('blue');
  });
  test('does not select node that passes exept func', () => {
    const mockOnSelect = jest.fn();
    const root = document.createElement('div');
    const child = document.createElement('div');
    child.id = 'skip_me';
    root.appendChild(child);
    const nodeSelector = NodeSelector(
      root,
      mockOnSelect,
      node => node.id === 'skip_me',
    );
    nodeSelector.enable();
    child.click();
    expect(mockOnSelect).not.toBeCalled();
    expect(child.style.outlineColor).toBe('');
  });
});
