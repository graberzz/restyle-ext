import { render, unmountComponentAtNode } from 'react-dom';

const Mounter = (id = 'ReSTYLE_CONTAINER') => {
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

export default Mounter;
