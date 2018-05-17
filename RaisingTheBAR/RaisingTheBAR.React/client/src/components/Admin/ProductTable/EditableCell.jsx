import React from 'react';
export default class EditableCell extends React.Component {

  render() {
    let value;
    if (!this.props.cellData.value) {
      value = ""
    } else {
      value = this.props.cellData.value
    }
    return (
      <td style={{ verticalAlign: "middle", textAlign: "center" }}>
        <input style={{ display: "table-cell", width: 100 + "%" }}
          type='text'
          name={this.props.cellData.type}
          id={this.props.cellData.id}
          value={value}
          onChange={this.props.onProductTableUpdate} />
      </td>
    );
  }
}