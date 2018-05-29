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
        categoryName: this.props.category.name
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
  postProductRemove = (id) => {
    var createUri = '/api/Category/RemoveProductFromCategory';
    axios.post(createUri, {
      productId: id,
      categoryId: this.props.category.id,
    }).catch(error => {
      this.setState({ responseError: error.response.data });
    });
    this.props.refresh()
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
            <Button onClick={() => this.postProductRemove(row.original.id)}> Remove </Button>
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