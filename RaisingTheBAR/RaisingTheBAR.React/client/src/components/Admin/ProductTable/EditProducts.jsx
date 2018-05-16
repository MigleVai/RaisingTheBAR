import React from 'react';
import AdminProductTable from './AdminProductTable';
import ProductSearchBar from './ProductSearchBar';
import axios from 'axios';
import update from 'immutability-helper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ErrorMessage from '../../User/ErrorMessage';

export default class EditProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSaveDialog: false,
      openEditConflictDialog: false,
      filterText: "",
      products: [],
      inTransaction: false,
      responseError: ''
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var uri = '/api/Administrator/GetProducts';
    axios.get(uri)
      .then(res => {
        const products = res.data;
        this.setState({ products: products });
      })
      .catch(error => {
        console.log("Error with getting products")
        this.setState({ responseError: error.response.data });
      });
  }
  handleImageChange(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          images: { $set: product.images },
        },
        [index]: {
          imageCount: {$set: product.imageCount}
        }
      })
    })
    product.isSaved = false
  }
  handleThumbnailChange(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          thumbnail: { $set: product.thumbnail }
        },
        [index]: {
          thumbnailCount: {$set: product.thumbnailCount}
        }
      })
    })
    product.isSaved = false
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleCheckedRowDisable(product) {
    var index = this.state.products.indexOf(product)
    this.setState({
      products: update(this.state.products, {
        [index]: {
          isEnabled: { $set: product.isEnabled },
        }
      })
    })
    product.isSaved = false
  };
  handleCheckedRowFeatured(product) {
    var index = this.state.products.indexOf(product);
    this.setState({
      products: update(this.state.products, {
        [index]: {
          isFeatured: { $set: product.isFeatured },
        }
      })
    })
    product.isSaved = false
  };
  handleTransactionState(val) {
    this.setState({ inTransaction: val });
  }
  handleEditConflict(product) {
    product.inConflict = true
    this.handleEditConflictDialogOpen()
  }
  handlePosts = () => {
    this.handleTransactionState(true);
    var addUri = '/api/Product/AddProduct';
    var editUri = '/api/Product/EditProduct';
    var products = this.state.products.slice();
    products.forEach(function (product) {
      if (product.isSaved !== undefined && product.isSaved === false) {
        if (product.isAdded === true && product.isAdded !== undefined) {
          axios.post(addUri, {
            displayName: product.displayName,
            images: product.images,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            discountedPrice: product.discountedPrice,
            isFeatured: product.isFeatured
          }).catch(error => {
            console.log("error with adding product!")
            this.setState({ responseError: error.response.data });
          });
        }
        if (product.isAdded === undefined) {
          axios.post(editUri, {
            id: product.id,
            displayName: product.displayName,
            images: product.images,
            thumbnail: product.thumbnail,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            timestamp: product.timestamp,
            isFeatured: product.isFeatured,
            isEnabled: product.isEnabled
          }).catch(error => {
            console.log("error with edditing product!")
            this.setState({ responseError: error.response.data });
            if (error.status === 409) {
              this.handleEditConflict(product);
            }
          });
        }
      }
    })
    this.handleSaveDialogClose();
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      displayName: "",
      images: [],
      thumbnail: "",
      description: "",
      price: 0,
      discountedPrice: 0,
      isFeatured: false,
      isAdded: true
    }
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key === item.name && product.id === item.id) {
          product[key] = item.value;
          product.isSaved = false
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
  };
  handleSaveDialogOpen = () => {
    this.setState({ openSaveDialog: true });
  };
  handleSaveDialogClose = () => {
    this.setState({ openSaveDialog: false });
  };
  handleEditConflictDialogOpen = () => {
    this.setState({ openEditConflictDialog: true });
  };
  handleEditConflictDialogClose = () => {
    this.setState({ openEditConflictDialog: false });
  };
  render() {
    const saveDialogActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleSaveDialogClose()}
      />,
      <FlatButton
        label="Save changes"
        primary={true}
        keyboardFocused={true}
        onClick={() => { if (!this.state.inTransaction) { this.handlePosts(); this.handleTransactionState(!this.state.inTransaction); } }}
        disabled={this.state.inTransaction}
      />,
    ];
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        <ProductSearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <AdminProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onCheckedRowDisable={this.handleCheckedRowDisable.bind(this)}
          onCheckedRowFeatured={this.handleCheckedRowFeatured.bind(this)}
          onImageChange={this.handleImageChange.bind(this)}
          onThumbnailChange={this.handleThumbnailChange.bind(this)}
          onSave={this.handleSaveDialogOpen.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
          onEditConflict={this.handleEditConflict.bind(this)}
        />
        <Dialog
          title="Save confirmation"
          actions={saveDialogActions}
          modal={false}
          open={this.state.openSaveDialog}
          onRequestClose={this.handleSaveDialogClose}
        >
          Do you really want to save changes?
        </Dialog>
        <Dialog
          title="Conflict with editing products"
          actions={
            <FlatButton
              label="Got it"
              primary={true}
              onClick={() => this.handleEditConflictDialogClose()}
            />}
          modal={false}
          open={this.state.openEditConflictDialog}
          onRequestClose={this.handleEditConflictDialogClose}
        >
          One or more product edits failed, because they had already been changed by somebody else. Please refresh the page to try again.
        </Dialog>
      </div>
    );

  }

}


