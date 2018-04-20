import React from 'react';
import AdminProductTable from './AdminProductTable';
import ProductSearchBar from './ProductSearchBar';
import axios from 'axios';

export default class EditProducts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = []
  }
  componentDidMount() {
    this.getData(this.props.match.params.category);
}
  getData() {
    var uri = '/api/Product/GetProducts';
    axios.get(uri)
      .then(res => {
        const products = res.data;
        this.setState({ products: products });
      })
      .catch(function (error) {
        // show error
      });
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      name: "",
      description: "",
      image: "",
      price: 0,
      featured: false
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
        if (key == item.name && product.id == item.id) {
          product[key] = item.value;

        }
      }
      return product;
    });
    this.setState({ products: newProducts });
    //  console.log(this.state.products);
  };
  render() {

    return (
      <div>
        <ProductSearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <AdminProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText} />
      </div>
    );

  }

}


