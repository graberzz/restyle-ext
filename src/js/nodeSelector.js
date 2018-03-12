import { setStyle } from './utils';

const NodeSelector = (onSelect) => {

	const nodeSelector = {
		selectedNode: null,
		
		enabled: false,
		
		hoverStyle: {
			outlineStyle: 'solid',
			outlineColor: 'red',
			outlineWidth: '2px',
		},
		
		selectedStyle: {
			outlineColor: 'orange',
		},

		enable() {
			this.enabled = true;
			this.selectedNode = null;
			console.log('kek');
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

		_onMouseOut(e) {
			if (!this.enabled ||
				e.target === this.selectedNode) return;

			setStyle(e.target, {
				outline: ''
			});			
		},

		_onMouseOver(e) {
			if (!this.enabled ||
				e.target === this.selectedNode) return;

			setStyle(e.target, this.hoverStyle);
		},

		_onMouseClick(e) {
			if (e.target === this.selectedNode) return;
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