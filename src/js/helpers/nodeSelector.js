import { setStyle, OUTLINE_WIDTH } from './utils';

const defaultHoverStyle = {
	outlineStyle: 'solid',
	outlineColor: 'red',
	outlineWidth: OUTLINE_WIDTH + 'px',
};

const defaultSelectedStyle = {
	outlineColor: 'orange',
};

const NodeSelector = ({onSelect,
					   except,
					   root,
					   hoverStyle = defaultHoverStyle,
					   selectedStyle = defaultSelectedStyle}) => {

	const nodeSelector = {
		selectedNode: null,
				
		enable() {
			this.selectedNode = null;
	        root.addEventListener("mouseout", this._onMouseOut);
			root.addEventListener("mouseover", this._onMouseOver);
	        root.addEventListener("click", this._onMouseClick);
		},

		disable() {
			if (this.selectedNode) {
				setStyle(this.selectedNode, {
					outline: '',
				});
			}

			this.enabled = false;
			this.selectedNode = null;

	        root.removeEventListener("mouseout", this._onMouseOut);
			root.removeEventListener("mouseover", this._onMouseOver);
	        root.removeEventListener("click", this._onMouseClick);
		},

		_validNode(node) {
			return node !== this.selectedNode &&
				   !except(node);;
		},

		_onMouseOut(e) {
			if (!this._validNode(e.target)) return;

			setStyle(e.target, {
				outline: ''
			});			
		},

		_onMouseOver(e) {
			if (!this._validNode(e.target)) return;

			setStyle(e.target, hoverStyle);
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
													  hoverStyle,
													  selectedStyle));

			onSelect(this.selectedNode);
		},
	};

	nodeSelector._onMouseClick = nodeSelector._onMouseClick.bind(nodeSelector);
	nodeSelector._onMouseOut = nodeSelector._onMouseOut.bind(nodeSelector);
	nodeSelector._onMouseOver = nodeSelector._onMouseOver.bind(nodeSelector);

	return nodeSelector;
};

export default NodeSelector;