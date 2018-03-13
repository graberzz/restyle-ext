import React from 'react';
import Select from '../BasicInputs/Select';
import { getDefaultStyle, setStyle } from '../../helpers/utils';

export default class FontFamilySelect extends React.Component {
  state = {
    options: ["Arial", "Times New Roman", "Consolas", "Comic Sans MS"],
    value: getDefaultStyle(this.props.node).fontFamily
  }

  onChange = (e) => {
    const value = e.target.value;

    setStyle(this.props.node, {
      fontFamily: value
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
        text="Family"
      />
    )
  }
}