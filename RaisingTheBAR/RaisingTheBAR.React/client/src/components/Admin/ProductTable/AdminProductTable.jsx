import React from 'react';
import AdminProductRow from './AdminProductRow';
import RaisedButton from 'material-ui/RaisedButton';

export default class AdminProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onSaveEvent() {
    this.props.onSave();
  }
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var checkedRowDisable = this.props.onCheckedRowDisable;
    var checkedRowFeatured = this.props.onCheckedRowFeatured;
    var thumbnailChange = this.props.onThumbnailChange;
    var imageChange = this.props.onImageChange;

    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.displayName.indexOf(filterText) === -1) {
        return null;
      }
      return (
        <AdminProductRow
          onProductTableUpdate={onProductTableUpdate}
          product={product}
          onCheckedDisable={checkedRowDisable.bind(this)}
          onCheckedFeatured={checkedRowFeatured.bind(this)}
          onDropThumbnail={thumbnailChange.bind(this)}
          onDropImage={imageChange.bind(this)}
          key={product.id}
        />)
    });

    return (
      <div>
        <button style={{width: 100 + 'px',}} type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        <table style={{ width: 100 + "%" }} className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: 12 + "%" }}>Display name</th>
              <th style={{ width: 7 + "%" }}>Price</th>
              <th style={{ width: 7 + "%" }}>Discount price</th>
              <th style={{ width: 40 + "%" }}>Description</th>
              <th style={{ width: 15 + "%" }}>Images</th>
              <th style={{ width: 15 + "%" }}>Thumbnail</th>
              <th style={{ width: 2 + "%" }} >Featured</th>
              <th style={{ width: 2 + "%" }} >Is disabled</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>

        </table>
        <RaisedButton style={{paddingBottom: 20 + 'px'}} label="Save changes" backgroundColor="#FF0000" onClick={this.onSaveEvent.bind(this)} />
      </div>
    );
  }
}