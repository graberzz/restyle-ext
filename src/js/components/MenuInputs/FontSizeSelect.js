import React from 'react';
import Select from '../BasicInputs/Select';
import { getDefaultStyle, setStyle } from '../../helpers/utils';

export default class FontSizeSelect extends React.Component {
  state = {
    options: [8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 24, 26, 28, 36, 48, 72],
    value: parseInt(getDefaultStyle(this.props.node).fontSize)
  }

  onChange = (e) => {
    const value = e.target.value;

    setStyle(this.props.node, {
      fontSize: value + 'px'
    }, true);
    
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
        text="Size"
      />
    )
  }
}