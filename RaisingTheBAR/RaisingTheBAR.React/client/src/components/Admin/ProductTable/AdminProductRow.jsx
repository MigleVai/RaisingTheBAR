import React from 'react';
import EditableCell from './EditableCell';
import Checkbox from 'material-ui/Checkbox';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class AdminProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedForDisable: false
    }
  }

  onCheckedDisableEvent() {
    this.setState((oldState) => {
      return {
        checkedForDisable: !oldState.checkedForDisable,
      };
    });
    this.props.product.checkedForDisable = !this.state.checkedForDisable;
    this.props.onCheckedDisable(this.props.product);
  }
  onCheckedFeaturedEvent() {
    this.props.product.isFeatured = !this.props.product.isFeatured;
    this.props.onCheckedFeatured(this.props.product);
  }
  render() {
    const styles = {
      redStyle: {
        backgroundColor: '#FF0000'
      },
      whiteStyle: {
        backgroundColor: '#FFFFFF'
      }
    };
    return (
      <tr style={this.props.product.inConflict ? styles.redStyle : styles.whiteStyle}>
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
          type: "discountedPrice",
          value: this.props.product.discountedPrice,
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
            checked={this.props.product.isFeatured}
            iconStyle={{ fill: 'orange' }}
            checkedIcon={<Star />}
            uncheckedIcon={<StarBorder />}
          />
        </td>
        <td>
          <Checkbox
            onCheck={this.onCheckedDisableEvent.bind(this)}
            checked={this.state.checkedForDisable}
            iconStyle={{ fill: 'red' }}
          />
        </td>
      </tr>



    );

  }

}