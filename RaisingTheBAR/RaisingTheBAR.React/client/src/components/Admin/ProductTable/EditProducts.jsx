import React from 'react';
import AdminProductTable from './AdminProductTable';
import ProductSearchBar from './ProductSearchBar';
import axios from 'axios';
import update from 'immutability-helper';

export default class EditProducts extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.filterText = "";
    this.state.products = []
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
      .catch(function (error) {
        // show error
        console.log("error with getting product data!")
        console.log(error)
      });
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };
  handleCheckedRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.setState({
      products: update(this.state.products, {[index]: {isCheckedForDeletion: {$set: product.checked}}})
    })
  };
  handleCheckedRowFeatured(product) {
    var index = this.state.products.indexOf(product);
    this.setState({
      products: update(this.state.products, {[index]: {featured: {$set: product.featured}}})
    })
  };
  handleSave() {
    // var addUri = '/api/Product/AddProduct';
    // var editUri = '/api/Product/EditProduct';
    // var products = this.state.products.slice();
    // var productsToSave = products.map((product) => {

    //   if (product.isSaved !== undefined && product.isSaved === false) {
    //     if (product.isAdded === true && product.isAdded !== undefined) {
    //       axios.post(addUri), {
    //         displayName: product.displayName,
    //         image: product.image,
    //         description: product.description,
    //         model: product.model,
    //         price: product.price,
    //         thumbnail: product.thumbnail,
    //         discountPrice: product.discountPrice
    //       }
    //     }
    //     if (product.isAdded === undefined) {
    //       axios.post(editUri), {
    //         id: product.id,
    //         model: product.model,
    //         displayName: product.displayName,
    //         image: product.image,
    //         thumbnail: product.thumbnail,
    //         description: product.description,
    //         price: product.price,
    //         discountPrice: product.discountPrice
    //       }
    //     }
    //   }
    // })
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      model: "",
      displayName: "",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q==",
      thumbnail: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/wgALCABAAEABASIA/8QAGQABAQEBAQEAAAAAAAAAAAAAAgABAwQG/9oACAEBAAAAAfoMFT3A9rmw6qEfP053oUOSKbnmbmljpVze4Knv/8QAHhAAAgICAwEBAAAAAAAAAAAAAAECEQMxEBIhIBP/2gAIAQEAAQUCNFtlFFtG+NCV/LVGx+y+l5JbyWdpNTcu3aY3Ix6e1vJPqv0YslyeV3GbMbck9vyRR1RSOqEkhey2J18t2a42U0Wy2U2a4//EACAQAAICAgICAwAAAAAAAAAAAAABESEQMSAyElFBQqH/2gAIAQEABj8CxR2Z2ZfCXxlYjnAxePs+y9FHzuR7m8IZWytiH+DksROdGjSKROIfGFwo6s6svP8A/8QAIxABAAIBAwQDAQEAAAAAAAAAAQARITFBURBhgZEgcdGhsf/aAAgBAQABPyGKC3SbJRyy+/gl9vJNks5IILG+igt0iL0nHxse05ggsmBsMvzyNjkmt7zDZmLBbKxre3X+QoyxTR5udlVZ9cSnTS8OIrebzys1veaXvGKlrbtGqqP09fscmAfyEE03V3zFIpYP+y+7w2ml7zA2OGVKGxFdQ+JcUiuKmjtaYmiB9EyNhgiAplj0vPxse14gAo6ICmbpZwzm8E4vJN0o4IAKOn//2gAIAQEAAAAQGCB+78c0ABj/xAAlEAEAAQMCBgMBAQAAAAAAAAABEQAhQTFxUWGBkcHRELHwIKH/2gAIAQEAAT8QpwoDLWC9Zenup/oA8VH9APisF6z29UYEHJ8OWgEtACv+W/8AKIV/y3oy0iSVyU7zjy/3yU7Tn3V+29grVwixZIWHk6VKJiQ16Cz/AFaK0IwwSMSHUA7VlJwUBjF+tl0vJRnTcgSGuQRwi4zepApcX2Aq3be41bvvcKuKSbFsJdO26VprLakVcS8JPRWkI5myMlO5RikLMroDkdbXw1GlW4XEcXEaUI1kBA1JwtX772GuSHaceqQswTpNDhCTSDpXEem4b0yMjIRXiAttUne9YCa5Kd5z6pyUiQ0gNfL+X/lEa+H8vRkoAg+HAiOGsF6z391F9gPmpvsA81gvWXr6owIBg+P/2Q==",
      description: "",
      price: 0,
      discountPrice: 0,
      featured: false,
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
    //  console.log(this.state.products);
  };
  render() {

    return (
      <div>
        <ProductSearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
        <AdminProductTable
          onProductTableUpdate={this.handleProductTable.bind(this)}
          onRowAdd={this.handleAddEvent.bind(this)}
          onCheckedRowDel={this.handleCheckedRowDel.bind(this)}
          onCheckedRowFeatured={this.handleCheckedRowFeatured.bind(this)}
          onSave={this.handleSave.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText} />
      </div>
    );

  }

}


