import React from 'react';
export default class EditableNumberCell extends React.Component {

  render() {
    let value;
    if (!this.props.cellData.value) {
      value = ""
    } else {
      value = this.props.cellData.value
    }
    const numberInputStyle = {
      "-webkit-appearance": "none",
      margin: 0,
      "-moz-appearance": "textfield",
      display: "table-cell", 
      width: 100 + "%" 
    }
    return (
      <td style={{ verticalAlign: "middle", textAlign: "center" }}>
        <input style={numberInputStyle}
          type="number"
          step="0.01"
          min="0.01"
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={value}
          onChange={this.props.onProductTableUpdate} />
      </td >
    );
  }
}