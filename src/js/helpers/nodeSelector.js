import { setStyle, OUTLINE_WIDTH } from './utils';

const defaultHoverStyle = {
	outlineStyle: 'solid',
	outlineColor: 'red',
	outlineWidth: OUTLINE_WIDTH + 'px',
};

const defaultSelectedStyle = {
	outlineColor: 'orange',
};


/**
 * DOM nodes interactive selection.
 * @param {DOMElement} root - DOM element that contains all the nodes to select.
 * @param {function=} onSelect - Callback, fires with selectedNode argument when a node has been selected.
 * @param {function=} except - Predicate, must return true if provided element is not selectable.
 * @param {object=} hoverStyle - Style that applies to the hovered node.
 * @param {object=} selectedStyle - Style that applies to the selected node.
 * @return {object} NodeSelector
 */

const NodeSelector = (root,
					  onSelect = _ => _,
					  except = _ => false,
					  hoverStyle = defaultHoverStyle,
					  selectedStyle = defaultSelectedStyle) => {

	const nodeSelector = {
		selectedNode: null,
		hoveredNode: null,
				
		enable() {
			this.selectedNode = null;
	        root.addEventListener("mouseout", this._onMouseOut, true);
			root.addEventListener("mouseover", this._onMouseOver, true);
	        root.addEventListener("click", this._onMouseClick, true);
		},

		disable() {
			if (this.selectedNode) {
				setStyle(this.selectedNode, {
					outline: '',
				});
			}
			if (this.hoveredNode) {
				setStyle(this.hoveredNode, {
					outline: '',
				});
			}
			this.enabled = false;
			this.selectedNode = null;

	        root.removeEventListener("mouseout", this._onMouseOut, true);
			root.removeEventListener("mouseover", this._onMouseOver, true);
	        root.removeEventListener("click", this._onMouseClick, true);
		},

		_validNode(node) {
			return node !== this.selectedNode &&
				   !except(node);;
		},

		_onMouseOut(e) {
			if (!this._validNode(e.target)) return;

			this.hoveredNode = null;
			setStyle(e.target, {
				outline: ''
			});			
		},

		_onMouseOver(e) {
			if (!this._validNode(e.target)) return;
			
			this.hoveredNode = e.target;
			setStyle(e.target, hoverStyle);
		},

		_onMouseClick(e) {
			if (!this._validNode(e.target)) return;

			e.preventDefault();
			e.stopImmediatePropagation();

			if (this.selectedNode) {
				setStyle(this.selectedNode, {
					outline: ''
				});	
			}

			onSelect(this.selectedNode, e.target);
			this.selectedNode = e.target;
			
			setStyle(this.selectedNode, Object.assign({},
				hoverStyle,
				selectedStyle));
				
		},
	};

	nodeSelector._onMouseClick = nodeSelector._onMouseClick.bind(nodeSelector);
	nodeSelector._onMouseOut = nodeSelector._onMouseOut.bind(nodeSelector);
	nodeSelector._onMouseOver = nodeSelector._onMouseOver.bind(nodeSelector);

	return nodeSelector;
};

export default NodeSelector;