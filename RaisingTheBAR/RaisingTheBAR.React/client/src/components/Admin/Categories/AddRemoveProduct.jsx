import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';

export default class AddRemoveProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElProductRemove: null,
      anchorElProductAdd: null,
      products: []
    };
  }
  componentDidMount() {
    this.getProducts()
  }
  getProducts() {
    var uri = '/api/Administrator/GetProducts';
    axios.get(uri)
      .then(res => {
        const products = res.data;
        this.setState({ products: products });
      })
      .catch(error => {
        console.log("Error with getting products")
        this.setState({ responseError: error.response.data }); //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
      });
  }
  postProductAdd = () => {
    var createUri = '/api/Category/AddProductToCategory';
    axios.post(createUri, {
      productId: this.state.addProductId,
      categoryId: this.props.category.id,
    }).catch(error => {
      console.log("error with adding product to a category!")
      console.log(error)
    });
    this.forceUpdate()
  }
  postProductRemove = () => {
    var createUri = '/api/Category/RemoveProductFromCategory';
    axios.post(createUri, {
      productId: this.state.removeProductId,
      categoryId: this.props.category.id,
    }).catch(error => {
      console.log("error with removing product from a category!")
      console.log(error)
    });
    this.forceUpdate()
  }
  handleAddProduct = () => {
    this.handleSubmit()
  }
  handleRemoveProduct = () => {
    this.handleSubmit()
  }
  handleSubmit = () => {
    console.log("Gonna edit dis category")
    console.log(this.props.category.id)
    console.log("Gonna add dis")
    console.log(this.state.addProductId)
    console.log("Gonna remove dis")
    console.log(this.state.removeProductId)
    this.setState({ addProductId: undefined, removeProductId: undefined });
  }
  handleAddProductMenuChoose = (event, index, id) => {
    this.setState({ selectedAddProductIndex: index, anchorElProductAdd: null, addProductId: id });
  }
  handleAddProductMenuOpen = event => {
    this.setState({ anchorElProductAdd: event.currentTarget });
  };
  handleAddProductMenuClose = () => {
    this.setState({ anchorElProductAdd: null });
  };
  handleRemoveProductMenuChoose = (event, index, id) => {
    this.setState({ selectedRemoveProductIndex: index, anchorElProductRemove: null, removeProductId: id });
  }
  handleRemoveProductMenuOpen = event => {
    this.setState({ anchorElProductRemove: event.currentTarget });
  };
  handleRemoveProductMenuClose = () => {
    this.setState({ anchorElProductRemove: null });
  };
  render() {
    // var availableForAdd = this.state.products.filter((product) => {
    //   return this.props.category.products.indexOf(product) === -1;
    // });
    // console.log(availableForAdd)
    return (
      <Paper style={{ width: 400, margin: "auto" }}>
        <form >
          <List style={{ width: 200, margin: "auto" }}>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={this.handleAddProductMenuOpen}
              style={{ fontSize: 200 }}
            >
              <ListItemText
                primary="Choose a product to add"
                secondary={this.state.selectedAddProductIndex === undefined ? "None" : (this.state.products[this.state.selectedAddProductIndex]).displayName}
              />
            </ListItem>
          </List>
          <Menu
            id="add-product"
            anchorEl={this.state.anchorElProductAdd}
            open={Boolean(this.state.anchorElProductAdd)}
            onClose={this.handleAddProductMenuClose}
          >
          {/* pakeist i availableForAdd */}
            {this.state.products.map((option, index) => (
              <MenuItem
                key={option.id}
                selected={index === this.state.selectedAddProductIndex}
                onClick={event => this.handleAddProductMenuChoose(event, index, option.id)}>
                {option.displayName}
              </MenuItem>
            ))}
          </Menu>
          <Button onClick={this.handleAddProduct} color="primary">
            Add product
          </Button>
          <List style={{ width: 200, margin: "auto" }}>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={this.handleRemoveProductMenuOpen}
            >
              <ListItemText
                primary="Choose a product to remove"
                secondary={this.state.selectedRemoveProductIndex === undefined ? "None" : (this.state.products[this.state.selectedRemoveProductIndex]).displayName + " " + ToPriceDisplay((this.state.products[this.state.selectedRemoveProductIndex]).price)}
              />
            </ListItem>
          </List>
          <Menu
            id="remove-product"
            anchorEl={this.state.anchorElProductRemove}
            open={Boolean(this.state.anchorElProductRemove)}
            onClose={this.handleRemoveProductMenuClose}
          >
          {/* pakeist i categoryProducts */}
            {this.state.products.map((option, index) => (
              <MenuItem
                key={option.id}
                selected={index === this.state.selectedRemoveProductIndex}
                onClick={event => this.handleRemoveProductMenuChoose(event, index, option.id)}>
                {option.displayName}
              </MenuItem>
            ))}
          </Menu>
          <Button onClick={this.handleRemoveProduct} color="primary">
            Remove product
          </Button>
        </form>
      </Paper>

    );
  }
}
