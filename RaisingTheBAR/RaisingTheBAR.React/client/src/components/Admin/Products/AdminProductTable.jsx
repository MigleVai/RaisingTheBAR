import React from 'react';
import AdminProductRow from './AdminProductRow';
import Button from '@material-ui/core/Button';
import Snackbar from 'material-ui/Snackbar';

export default class AdminProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false
    }
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
  }
  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false
    });
  }
  handleSnackbarOpen = () => {
    this.setState({
      openSnackbar: true
    });
  };
  onSaveEvent() {
    this.props.onSave();
  }
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var checkedRowDisable = this.props.onCheckedRowDisable;
    var checkedRowFeatured = this.props.onCheckedRowFeatured;
    var thumbnailChange = this.props.onThumbnailChange;
    var imageChange = this.props.onImageChange;
    var handleSnackbarOpen = this.handleSnackbarOpen;

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
          openSnackbar={handleSnackbarOpen.bind(this)}
        />)
    });

    return (
      <div>
        <Button style={{ margin: 8, backgroundColor:"#FF0000" }}  onClick={this.onSaveEvent.bind(this)}> Save changes </Button>
        <table style={{ width: 100 + "%" }} className="table table-bordered">
          <thead >
            <tr style={{ verticalAlign: "middle", textAlign: "center" }}>
              <th style={{ width: 12 + "%", verticalAlign: "middle", textAlign: "center" }}>Display name</th>
              <th style={{ width: 7 + "%", verticalAlign: "middle", textAlign: "center" }}>Price</th>
              <th style={{ width: 7 + "%", verticalAlign: "middle", textAlign: "center" }}>Discount price</th>
              <th style={{ width: 40 + "%", verticalAlign: "middle", textAlign: "center" }}>Description</th>
              <th style={{ width: 15 + "%", verticalAlign: "middle", textAlign: "center" }}>Images</th>
              <th style={{ width: 15 + "%", verticalAlign: "middle", textAlign: "center" }}>Thumbnail</th>
              <th style={{ width: 2 + "%", verticalAlign: "middle", textAlign: "center" }} >Featured</th>
              <th style={{ width: 2 + "%", verticalAlign: "middle", textAlign: "center" }} >Is disabled</th>
            </tr>
          </thead>

          <tbody>
            {product}
          </tbody>

        </table>
        <Button style={{ width: 100 + 'px', backgroundColor: "green", float:"right", margin: 10}} onClick={this.props.onRowAdd}>Add</Button>

        <Snackbar
          open={this.state.openSnackbar}
          message="Some files were rejected, maybe they were not images, or over 1 MB size"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose}
        />
      </div>
    );
  }
}