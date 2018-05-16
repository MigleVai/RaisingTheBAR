import React from 'react';
import EditableCell from './EditableCell';
import Checkbox from 'material-ui/Checkbox';
import Star from 'material-ui/svg-icons/toggle/star';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import Dropzone from 'react-dropzone'
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

export default class AdminProductRow extends React.Component {

  onCheckedDisableEvent() {
    this.props.product.isEnabled = !this.props.product.isEnabled;
    this.props.onCheckedDisable(this.props.product);
  }
  onCheckedFeaturedEvent() {
    this.props.product.isFeatured = !this.props.product.isFeatured;
    this.props.onCheckedFeatured(this.props.product)
  }
  onImageEraseEvent() {
    this.props.product.images = ["delete"]
    this.props.product.imageCount = 0;
    this.props.onDropImage(this.props.product);
  }
  onThumbnailEraseEvent() {
    this.props.product.thumbnail = "delete";
    this.props.product.thumbnailCount = 0;
    this.props.onDropThumbnail(this.props.product);
  }
  onDropThumbnailEvent(accepted, rejected) {
    accepted.forEach(file => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        var dataUrl = e.target.result;
        this.props.product.thumbnail = dataUrl
        this.props.product.thumbnailCount = 1
        this.props.onDropThumbnail(this.props.product);
      }
    })
  }
  onDropImageEvent(accepted, rejected) {
    this.props.product.images = []
    accepted.forEach(file => {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        var dataUrl = e.target.result;
        this.props.product.images.push(dataUrl)
        this.props.product.imageCount ++
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
        <td >
          <Toolbar style={{ display: "inline", padding: 0, backgroundColor: "#fffff", height: 3, boxSizing: "content-box" }}>
            <ToolbarGroup>
              <div >{"Currently: " + this.props.product.imageCount}</div>
              <ToolbarSeparator style={{ float: "right", display: "inline", marginLeft: 2, marginRight: 2 }} />
              <Dropzone
                style={{ float: "right" }}
                maxSize={1048576}
                onDrop={(accepted, rejected) => {
                  this.onDropImageEvent(accepted, rejected)
                }}
                accept="image/*">
                <AddAPhoto />
              </Dropzone>
              <ToolbarSeparator style={{ float: "right", display: "inline", marginLeft: 2, marginRight: 2 }} />
              <IconButton onClick={this.onImageEraseEvent.bind(this)} style={{ width: "inherit", height: "inherit", float: "right", boxSizing: "content-box", display: "inline", padding: 0 }} tooltip="Erase all">
                <DeleteForever />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </td>
        <td >
          <Toolbar style={{ display: "inline", padding: 0, backgroundColor: "#fffff", height: 3, boxSizing: "content-box" }}>
            <ToolbarGroup>
              <div >{this.props.product.thumbnailCount ? "Existing" : "Non yet"}</div>
              <ToolbarSeparator style={{ float: "right", display: "inline", marginLeft: 2, marginRight: 2 }} />
              <Dropzone
                style={{ float: "right" }}
                maxSize={1048576}
                onDrop={(accepted, rejected) => {
                  this.onDropThumbnailEvent(accepted, rejected)
                }}
                accept="image/*">
                <AddAPhoto />
              </Dropzone>
              <ToolbarSeparator style={{ float: "right", display: "inline", marginLeft: 2, marginRight: 2 }} />
              <IconButton onClick={this.onThumbnailEraseEvent.bind(this)} style={{ width: "inherit", height: "inherit", float: "right", boxSizing: "content-box", display: "inline", padding: 0 }} tooltip="Erase all">
                <DeleteForever />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
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