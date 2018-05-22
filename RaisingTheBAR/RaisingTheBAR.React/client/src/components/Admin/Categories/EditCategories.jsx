import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import ErrorMessage from '../../User/ErrorMessage';

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: '',
      categories: []
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    var uri = '/api/Category/GetAllCategories';
    axios.get(uri
    ).then(res => {
      const categories = res.data;
      this.setState({ categories: categories });
    }
    ).catch(error => {
      console.log("error with getting all categories!")
      this.setState({ responseError: error.response.request.statusText });
    });
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
        resizable: false,
        filterable: false,
      }, {
        Header: 'Product amount',
        accessor: 'productAmount',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }
    ];

    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        < ReactTable
          data={this.state.categories}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          SubComponent={row => {
            return (
              <div>
                <h1> Future implementation of categories functionality</h1>
              </div>
            )
          }}
        />
      </div>
    )
  }
}