import React from 'react';
import EditableCell from './EditableCell';

export default class AdminProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "name",
          value: this.props.product.name,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "description",
          value: this.props.product.description,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "image",
          value: this.props.product.image,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "id",
          value: this.props.product.id,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "featured",
          value: this.props.product.featured,
          id: this.props.product.id
        }} />
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn" />
        </td>
      </tr>
    );

  }

}