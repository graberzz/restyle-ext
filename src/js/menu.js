import { render } from 'react-dom';
import { setStyle } from './utils';

const Mounter = {
	wrap: document.createElement('div'),
	component: null,

	mount(node, component) {
		this.wrap.className = 'editpage__wrap';

		setStyle(this.wrap, {
			left: node.offsetLeft + 'px',
			top: node.offsetTop + 'px'
		});

		document.body.appendChild(this.wrap);

		if (component !== this.component) {
			this.component = component;
			render(component, this.wrap);
		}
	},

	unmount() {
		if (document.body.contains(this.wrap)) {
			document.body.removeChild(this.wrap);
		}
	}
};

export default Mounter;