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
      console.log(error)
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
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        // style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: "Price",
        accessor: "price",
        Cell: row => {
          return ToPriceDisplay(row.original.price);
        },
        // style: styles.tdStyles,
      }, {
        Header: "Discounted price",
        accessor: "discountedPrice",
        Cell: row => {
          return ToPriceDisplay(row.original.discountedPrice);
        },
        // style: styles.tdStyles,
      }, {
        Header: "Remove",
        Cell: row =>
          <div>
            <Button label="Remove" backgroundColor="#FF0000" onClick={() => this.handleRemoveProduct(row.original)} />
          </div>,
        // style: styles.tdStyles,
      }
    ];
    return (
      <div>
        < ReactTable
          data={this.state.products}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          // style={{ display: 'contents' }}
        />
      </div>
    )
  }
}