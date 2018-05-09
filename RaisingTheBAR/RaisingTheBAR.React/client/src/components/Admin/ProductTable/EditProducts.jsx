import React from 'react';
import AdminProductTable from './AdminProductTable';
import ProductSearchBar from './ProductSearchBar';
import axios from 'axios';
import update from 'immutability-helper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class EditProducts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      openSaveDialog: false,
      filterText: "",
      products: [],
      inTransaction: false
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
        console.log("error with getting product data!")
        console.log(error)
      });
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleCheckedRowDisable(product) {
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
  handlePosts = () => {
    this.handleTransactionState(true);
    var addUri = '/api/Product/AddProduct';
    var editUri = '/api/Product/EditProduct';
    var deleteUri = '/api/Product/DeleteProduct';
    var products = this.state.products.slice();
    products.forEach(function (product) {
      if (product.isSaved !== undefined && product.isSaved === false) {
        if (product.isAdded === true && product.isAdded !== undefined) {
          axios.post(addUri, {
            displayName: product.displayName,
            image: product.image,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            discountedPrice: product.discountedPrice,
            isFeatured: product.isFeatured
          }).catch(error => {
            console.log("error with adding product!")
            console.log(error)
          });
        }
        if (product.isAdded === undefined && product.checkedForDisable !== true) {
          axios.post(editUri, {
            id: product.id,
            displayName: product.displayName,
            image: product.image,
            thumbnail: product.thumbnail,
            description: product.description,
            price: product.price,
            discountedPrice: product.discountedPrice,
            timestamp: product.timestamp,
            isFeatured: product.isFeatured
          }).catch(error => {
            console.log("error with edditing product!")
            console.log(error)
          });
        }
        if (product.checkedForDisable === true) {
          axios.post(deleteUri, {
            request: product.id
          }
          ).catch(error => {
            console.log("error with disabling product!")
            console.log(error)
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
      image: "",
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
        onClick={() =>{  if(!this.state.inTransaction){ this.handlePosts(); this.handleTransactionState(!this.state.inTransaction);}}}
        disabled={this.state.inTransaction}
      />,
    ];
    return (
      <div>
        <ProductSearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <AdminProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onCheckedRowDisable={this.handleCheckedRowDisable.bind(this)}
          onCheckedRowFeatured={this.handleCheckedRowFeatured.bind(this)}
          onSave={this.handleSaveDialogOpen.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText} />
        <Dialog
          title="Save confirmation"
          actions={saveDialogActions}
          modal={false}
          open={this.state.openSaveDialog}
          onRequestClose={this.handleSaveDialogClose}
        >
          Do you really want to save changes?
        </Dialog>
      </div>
    );

  }

}


