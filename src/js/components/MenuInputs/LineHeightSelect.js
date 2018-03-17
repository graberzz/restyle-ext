import React from 'react';
import Select from '../BasicInputs/Select';
import { getDefaultStyle, setStyle } from '../../helpers/utils';

export default class LineHeightSelect extends React.Component {
  state = {
    options: ['DEFAULT', 0.5, 1, 1.5, 2, 2.5, 3, 4, 5],
    value: parseInt(getDefaultStyle(this.props.node).lineHeight)
  }

  onChange = (e) => {
    const value = e.target.value === 'DEFAULT' ? '' : e.target.value;

    setStyle(this.props.node, {
      lineHeight: value,
    }, true, true);
    
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
        text="Line height"
      />
    )
  }
}