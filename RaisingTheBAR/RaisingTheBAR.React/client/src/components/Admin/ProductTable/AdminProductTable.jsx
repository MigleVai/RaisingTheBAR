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
  blahEditConflict(product) {
    this.props.onEditConflict(product);
  }
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var checkedRowDisable = this.props.onCheckedRowDisable;
    var checkedRowFeatured = this.props.onCheckedRowFeatured;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function(product) {
      if (product.displayName.indexOf(filterText) === -1) {
        return null;
      }
      return (<AdminProductRow
        onProductTableUpdate={onProductTableUpdate}
        product={product}
        onCheckedDisable={checkedRowDisable.bind(this)}
        onCheckedFeatured={checkedRowFeatured.bind(this)}
        key={product.id} />)
    });

    return (
      <div>
        <button type="button" onClick={this.props.onRowAdd} className="btn btn-success pull-right">Add</button>
        <table style={{width: 100 + "%"}} className="table table-bordered">
          <thead>
            <tr>
              <th >Display name</th>
              <th style={{width: 7 + "%"}}>Price</th>
              <th style={{width: 7 + "%"}}>Discount price</th>
              <th style={{width: 20 + "%"}}>Description</th>
              <th>Image base64</th>
              <th>Thumbnail base64</th>
              <th style={{width: 4 + "%"}} >Featured</th>
              <th style={{width: 4 + "%"}} >Is disabled</th>
            </tr>
          </thead>

          <tbody>
            {product}

          </tbody>

        </table>
        <RaisedButton label="Save changes" backgroundColor="#FF0000" onClick={this.onSaveEvent.bind(this)} />
      </div>
    );
  }
}