import { render, unmountComponentAtNode } from 'react-dom';
import { CONTAINER_ID } from './';

const Mounter = (id = CONTAINER_ID) => {
  const container = document.createElement('div');
  container.id = id;
  let rootElement = null;
  const mount = (root, component) => {
    rootElement = root;
    root.appendChild(container);
    render(component, container);
  };

  const unmount = () => {
    unmountComponentAtNode(container);
    rootElement.removeChild(container);
  };

  return {
    mount,
    unmount,
  };
};

export default Mounter();
