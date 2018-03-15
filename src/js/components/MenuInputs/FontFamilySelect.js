import React from 'react';
import Select from '../BasicInputs/Select';
import { getDefaultStyle, setStyle } from '../../helpers/utils';


const webSafeFonts = ['Arial', 'Arial Black', 'Times New Roman',
                      'Courier New', 'Verdana', 'Georgia',
                      'Comic Sans MS', 'Consolas', 'Trebuchet MS']

export default class FontFamilySelect extends React.Component {
  state = {
    options: ['DEFAULT', ...webSafeFonts],
    value: 'DEFAULT'
  }

  onChange = (e) => {
    const value = e.target.value;

    setStyle(this.props.node, {
      fontFamily: value === 'DEFAULT' ? '' : value
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