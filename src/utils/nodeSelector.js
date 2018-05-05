import { setStyle, getSelector, OUTLINE_WIDTH } from './';

const defaultHoverStyle = {
  outlineStyle: 'solid',
  outlineColor: 'red',
  outlineWidth: `${OUTLINE_WIDTH}px`,
};

const defaultSelectedStyle = {
  outlineColor: 'orange',
};

/**
 * DOM nodes interactive selection.
 * @param {DOMElement} root - DOM element that contains all the nodes to select.
 * @param {function=} onSelect - Callback, fires with selectedNode argument when
 * a node has been selected.
 * @param {function=} except - Predicate, must return true if provided element is not selectable.
 * @param {object=} hoverStyle - Style that applies to the hovered node.
 * @param {object=} selectedStyle - Style that applies to the selected node.
 * @return {object} NodeSelector
 */

const NodeSelector = (
  root,
  onSelect = f => f,
  except = () => false,
  hoverStyle = defaultHoverStyle,
  selectedStyle = defaultSelectedStyle,
) => {
  const nodeSelector = {
    selectedNode: null,
    selectedNodes: [],
    hoveredNode: null,
    enabled: false,

    enable() {
      this.enabled = true;
      root.addEventListener('mouseout', this.onMouseOut, true);
      root.addEventListener('mouseover', this.onMouseOver, true);
      root.addEventListener('click', this.onMouseClick, true);
    },

    suspend() {
      this.enabled = false;
      root.removeEventListener('mouseout', this.onMouseOut, true);
      root.removeEventListener('mouseover', this.onMouseOver, true);
      root.removeEventListener('click', this.onMouseClick, true);
    },

    disable() {
      if (this.selectedNode) {
        setStyle(this.selectedNode, { outline: '' });
      }
      if (this.hoveredNode) {
        setStyle(this.hoveredNode, { outline: '' });
      }

      this.selectedNodes.forEach(node => setStyle(node, { outline: '' }));
      this.selectedNodes = [];
      this.selectedNode = null;

      this.suspend();
    },

    toggle() {
      if (this.enabled) {
        this.disable();
      } else {
        this.enable();
      }
    },

    validNode(node) {
      return node !== this.selectedNode && !except(node);
    },

    validNodes(node) {
      if (this.selectedNodes.length === 0) return true;
      let bool = true;
      for (let i = 0; i < this.selectedNodes.length; i += 1) {
        if (this.selectedNodes[i] === node) {
          bool = false;
        }
      }
      return bool;
    },

    onMouseOut(e) {
      if (!this.validNode(e.target)) return;
      if (!this.validNodes(e.target)) return;

      this.hoveredNode = null;
      setStyle(e.target, { outline: '' });
    },

    onMouseOver(e) {
      if (!this.validNode(e.target)) return;
      if (!this.validNodes(e.target)) return;
      this.hoveredNode = e.target;
      setStyle(e.target, hoverStyle);
    },

    onMouseClick(e) {
      if (!this.validNode(e.target)) return;
      if (!this.validNodes(e.target)) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      if (this.selectedNode) {
        setStyle(this.selectedNode, { outline: '' });
      }

      this.pastSelectedNode = this.selectedNode;
      this.selectedNode = e.target;

      // selecting all the nodes with provided node's class selector

      this.selectedNodes.forEach(node => setStyle(node, { outline: '' }));
      this.selectedNodes = [];

      const nodeCSSSelector = getSelector(this.selectedNode);
      const sameClassNodes = Array.from(document.querySelectorAll(nodeCSSSelector));
      sameClassNodes.forEach((node) => {
        if (!this.validNode(node)) return;
        setStyle(node, {
          ...hoverStyle,
          ...this.selectedStyle,
        });
        this.selectedNodes.push(node);
      });
      // ---
      setStyle(this.selectedNode, {
        ...hoverStyle,
        ...selectedStyle,
      });
      onSelect(this.pastSelectedNode, this.selectedNode, nodeCSSSelector);
    },
  };

  nodeSelector.onMouseClick = nodeSelector.onMouseClick.bind(nodeSelector);
  nodeSelector.onMouseOut = nodeSelector.onMouseOut.bind(nodeSelector);
  nodeSelector.onMouseOver = nodeSelector.onMouseOver.bind(nodeSelector);

  return nodeSelector;
};

export default NodeSelector;
