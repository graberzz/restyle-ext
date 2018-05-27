import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import ShadowDOM from 'react-shadow';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';
import { CONTAINER_ID } from '../utils';

const Mounter = (id = 'ReSTYLE_CONTAINER') => {
  const container = document.createElement('div');
  container.id = id;
  let rootElement = null;
  const mount = (root, component) => {
    rootElement = root;
    root.appendChild(container);
    const generateClassName = createGenerateClassName();
    const jss = create(jssPreset());
    debugger; 
    jss.options.insertionPoint = document.getElementById(CONTAINER_ID);
    render(
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <ShadowDOM include="style.css">
          <div id="RESTYLE_1882">
            {component}
          </div>
        </ShadowDOM>
      </JssProvider>, container,
    );
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
