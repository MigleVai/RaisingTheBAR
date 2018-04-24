import React from 'react';
import EditableCell from './EditableCell';
import Checkbox from 'material-ui/Checkbox';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class AdminProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  onCheckedDelEvent() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
    this.props.product.checked = !this.state.checked;
    this.props.onCheckedDel(this.props.product);
  }
  onCheckedFeaturedEvent() {
    this.props.product.featured = !this.props.product.featured;
    this.props.onCheckedFeatured(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "displayName",
          value: this.props.product.displayName,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "price",
          value: this.props.product.price,
          id: this.props.product.id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "discountPrice",
          value: this.props.product.discountPrice,
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
          type: "thumbnail",
          value: this.props.product.thumbnail,
          id: this.props.product.id
        }} />
        <td>
          <Checkbox
            onCheck={this.onCheckedFeaturedEvent.bind(this)}
            checked={this.props.product.featured}
            iconStyle={{ fill: 'orange' }}
            checkedIcon={<Star />}
            uncheckedIcon={<StarBorder />}
          />
        </td>
        <td className="del-cell">
          <Checkbox
            onCheck={this.onCheckedDelEvent.bind(this)}
            checked={this.state.checked}
            iconStyle={{ fill: 'red' }}
          />
        </td>
      </tr>



    );

  }

}