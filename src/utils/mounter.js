import { render, unmountComponentAtNode } from 'react-dom';
import { CONTAINER_ID } from './';

const Mounter = (id = CONTAINER_ID) => {
  const container = document.createElement('iframe');
  container.src = chrome.extension.getURL('iframe.html');
  container.id = id;
  container.style.position = 'fixed';
  container.style.left = 0;
  container.style.top = 0;

  window.addEventListener('message', (e) => {
    const scrollHeight = e.data;

    container.style.height = scrollHeight + 'px'; 
  }, false);

  let rootElement = null;
  const mount = (root, component) => {
    rootElement = root;
    root.appendChild(container);
  //  render(component, container);
  };

  const unmount = () => {
//    unmountComponentAtNode(container);
    rootElement.removeChild(container);
  };

  return {
    mount,
    unmount,
  };
};

export default Mounter();
