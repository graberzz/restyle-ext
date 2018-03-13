import { setStyle, OUTLINE_WIDTH } from './utils';

const NodeSelector = (onSelect, except) => {
	const nodeSelector = {
		selectedNode: null,
				
		hoverStyle: {
			outlineStyle: 'solid',
			outlineColor: 'red',
			outlineWidth: OUTLINE_WIDTH + 'px',
		},
		
		selectedStyle: {
			outlineColor: 'orange',
		},

		enable() {
			this.selectedNode = null;
	        document.body.addEventListener("mouseout", this._onMouseOut);
			document.body.addEventListener("mouseover", this._onMouseOver);
	        document.body.addEventListener("click", this._onMouseClick);
		},

		disable() {
			if (this.selectedNode) {
				setStyle(this.selectedNode, {
					outline: '',
				});
			}

			this.enabled = false;
			this.selectedNode = null;

	        document.body.removeEventListener("mouseout", this._onMouseOut);
			document.body.removeEventListener("mouseover", this._onMouseOver);
	        document.body.removeEventListener("click", this._onMouseClick);
		},

		_validNode(node) {
			return node !== this.selectedNode       &&
				   !node.classList.contains(except) &&
				   !node.closest(`.${except}`);
		},

		_onMouseOut(e) {
			if (!this._validNode(e.target)) return;

			setStyle(e.target, {
				outline: ''
			});			
		},

		_onMouseOver(e) {
			if (!this._validNode(e.target)) return;

			setStyle(e.target, this.hoverStyle);
		},

		_onMouseClick(e) {
			if (!this._validNode(e.target)) return;

			e.preventDefault();
			if (this.selectedNode) {
				setStyle(this.selectedNode, {
					outline: ''
				});	
			}
			this.selectedNode = e.target;

			setStyle(this.selectedNode, Object.assign({},
													  this.hoverStyle,
													  this.selectedStyle));

			onSelect(this.selectedNode);
		},
	};

	nodeSelector._onMouseClick = nodeSelector._onMouseClick.bind(nodeSelector);
	nodeSelector._onMouseOut = nodeSelector._onMouseOut.bind(nodeSelector);
	nodeSelector._onMouseOver = nodeSelector._onMouseOver.bind(nodeSelector);

	return nodeSelector;
};

export default NodeSelector;