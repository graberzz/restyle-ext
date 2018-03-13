import React from 'react';
import Select from '../BasicInputs/Select';
import { getDefaultStyle, setStyle } from '../../utils';

export default class TextAlignSelect extends React.Component {
  state = {
    options: ['left', 'right', 'center', 'justify'],
    value: getDefaultStyle(this.props.node).textAlign,
  }

  onChange = (e) => {
    const value = e.target.value;

    setStyle(this.props.node, {
      textAlign: value
    });
    
    this.setState({
      value
    });
  }

  render() {
    const { options, value } = this.state;

    return (
      <Select
        options={options}
        value={value}
        onChange={this.onChange}
        text="Align"
      />
    )
  }
}