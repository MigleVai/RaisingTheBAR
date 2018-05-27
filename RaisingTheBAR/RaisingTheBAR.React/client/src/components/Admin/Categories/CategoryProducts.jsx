import React from 'react';
import ReactTable from 'react-table';
import ErrorMessage from '../../User/ErrorMessage';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';

export default class CategoryProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: '',
      products: [],
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData = () => {
    var productsByCategoryUri = '/api/Product/GetProductsByCategories';
    axios.get(productsByCategoryUri, {
      params: {
        categoryName: this.props.category
      }
    })
      .then(res => {
        const products = res.data;
        this.setState({ products: products });
      })
      .catch(error => {
        console.log("Error with getting products by category")
        this.setState({ responseError: error.response.data });
      });
  }
  postProductRemove = (product) => {
    var createUri = '/api/Category/RemoveProductFromCategory';
    axios.post(createUri, {
      productId: product.id,
      categoryId: this.props.category.id,
    }).catch(error => {
      console.log("error with removing product from a category!")
      this.setState({ responseError: error.response.data });
    });
    this.forceUpdate()
  }
  handleRemoveProduct = (product) => {
    this.handleSubmit(product)
  }
  handleSubmit = () => {
    console.log("Gonna edit dis category")
    console.log(this.props.category.id)
    console.log("Gonna remove dis")
    console.log(this.state.removeProductId)
    // this.postProductRemove(product)
    this.setState({ removeProductId: undefined });
  }
  render() {
    const styles = {
      tdStyles: {
        margin: 'auto',
      }
    };
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        style: styles.tdStyles,
        maxWidth: 400,
        resizable: false,
        filterable: false,
      }, {
        Header: "Price",
        accessor: "price",
        Cell: row => {
          return ToPriceDisplay(row.original.price);
        },
        maxWidth: 200,
        style: styles.tdStyles,
      }, {
        Header: "Discounted price",
        accessor: "discountedPrice",
        Cell: row => {
          return ToPriceDisplay(row.original.discountedPrice);
        },
        maxWidth: 200,
        style: styles.tdStyles,
      }, {
        Header: "Remove",
        Cell: row =>
          <div>
            <Button label="Remove" backgroundColor="#FF0000" onClick={() => this.handleRemoveProduct(row.original)} />
          </div>,
        style: styles.tdStyles,
      }
    ];
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        < ReactTable
          data={this.state.products}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
        style={{ display: 'contents' }}
        />
      </div>
    )
  }
}