import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';
import AddIcon from 'material-ui/svg-icons/content/add'
import ErrorMessage from '../../User/ErrorMessage';

export default class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElProductAdd: null,
      allProducts: [],
      categoryProducts: [],
      responseError: '',
    }
  }
  // componentDidMount() {
  //   this.getAllProducts()
  // }
  getAllProducts = () => {
    var uri = '/api/Administrator/GetProducts';
    axios.get(uri)
      .then(res => {
        const products = res.data;
        this.setState({ allProducts: products });
      })
      .catch(error => {
        console.log("Error with getting products")
        this.setState({ responseError: error.response.data });
      });
  }
  getCategoryProducts = () => {
    var productsByCategoryUri = '/api/Product/GetProductsByCategories';
    axios.get(productsByCategoryUri, {
      params: {
        categoryName: this.props.category
      }
    })
      .then(res => {
        const products = res.data;
        this.setState({ categoryProducts: products });
      })
      .catch(error => {
        if (error.response.data) {
          this.setState({ responseError: error.response.data });
        }
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
    // this.forceUpdate()
  }
  handleAddProduct = () => {
    this.handleSubmit()
  }
  handleSubmit = () => {
    console.log("Gonna edit dis category")
    console.log(this.props.category.id)
    console.log("Gonna add dis")
    console.log(this.state.addProductId)
    this.postProductAdd()
    this.setState({ addProductId: undefined })
  }
  handleAddProductMenuChoose = (event, index, id) => {
    this.setState({ selectedAddProductIndex: index, anchorElProductAdd: null, addProductId: id });
  }
  handleAddProductMenuOpen = event => {
    this.setState({ anchorElProductAdd: event.currentTarget });
    this.getCategoryProducts();
    this.getAllProducts();
  };
  handleAddProductMenuClose = () => {
    this.setState({ anchorElProductAdd: null });
  };
  render() {
    // var availableForAddProducts = this.state.allProducts.filter((product) => {
    //   return this.state.categoryProducts.indexOf(product) === -1;
    // });
    // console.log(availableForAddProducts)
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        <Toolbar style={{ display: "inline", padding: 0, backgroundColor: "#fffff", height: 3, boxSizing: "content-box" }}>
          <ToolbarGroup>
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
                  secondary={
                    this.state.selectedAddProductIndex === undefined ?
                      "None" :
                      (this.state.allProducts[this.state.selectedAddProductIndex]).displayName + ToPriceDisplay((this.state.allProducts[this.state.selectedAddProductIndex]).price)}
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
              {this.state.allProducts.map((option, index) => (
                <MenuItem
                  key={option.id}
                  selected={index === this.state.selectedAddProductIndex}
                  onClick={event => this.handleAddProductMenuChoose(event, index, option.id)}>
                  {option.displayName + " " + ToPriceDisplay(option.price)}
                </MenuItem>
              ))}
            </Menu>
            <ToolbarSeparator style={{ display: "inline", marginLeft: 25, marginRight: 25 }} />
            <Button onClick={this.handleAddProduct} style={{ marginRight: 12, marginLeft: 15, width: 150, height: 25 }} aria-label="Add a product">
              Add chosen
            <AddIcon style={{ color: "green" }} />
            </Button>
          </ToolbarGroup>
        </Toolbar>
      </div>
    )
  }
}