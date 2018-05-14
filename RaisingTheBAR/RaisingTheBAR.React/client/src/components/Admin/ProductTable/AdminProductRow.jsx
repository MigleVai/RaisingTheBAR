import React from 'react';
import EditableCell from './EditableCell';
import Checkbox from 'material-ui/Checkbox';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/FlatButton';

export default class AdminProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onCheckedDisableEvent() {
    this.props.product.isEnabled = !this.props.product.isEnabled
    this.props.onCheckedDisable(this.props.product);
  }
  onCheckedFeaturedEvent() {
    this.props.product.isFeatured = !this.props.product.isFeatured;
    this.props.onCheckedFeatured(this.props.product);
  }
  onDropThumbnailEvent(accepted, rejected) {
    console.log("files were dropped in thumbnail")
    accepted.forEach(file => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        var dataUrl = e.target.result;
        const base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        this.props.product.thumbnail = base64Data
        console.log(base64Data)
        this.props.onDropThumbnail(this.props.product);
      }
    })
  }
  onDropImageEvent(accepted, rejected) {
    console.log("files were dropped in image")
    this.props.product.images = []
    accepted.forEach(file => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        var dataUrl = e.target.result;
        const base64Data = dataUrl.substr(dataUrl.indexOf('base64,') + 'base64,'.length);
        this.props.product.images.push(base64Data)
        this.props.onDropImage(this.props.product);
      }
    })
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
        <td>
          <Dropzone
            style={{ height: 5 + "px" }}
            maxSize={1048576}
            onDrop={(accepted, rejected) => {
              this.onDropImageEvent(accepted, rejected)
            }}
            accept="image/*">
            <FlatButton label="Add/change"  />
          </Dropzone>
        </td>
        <td >
          <Dropzone
            style={{ height: 5 + "px" }}
            maxSize={1048576}
            onDrop={(accepted, rejected) => {
              this.onDropThumbnailEvent(accepted, rejected)
            }}
            accept="image/*">
            <FlatButton label="Add/change"  />
          </Dropzone>
        </td>
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
            checked={!this.props.product.isEnabled}
            iconStyle={{ fill: 'red' }}
          />
        </td>
      </tr>
    );
  }
}