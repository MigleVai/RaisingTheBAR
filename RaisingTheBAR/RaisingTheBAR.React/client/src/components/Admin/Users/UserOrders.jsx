import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import ErrorMessage from '../../User/ErrorMessage';

export default class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      responseError: ''
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    var uri = '/api/Administrator/GetOrdersByUser';
    axios.get(uri, {
      params: {
        userId: this.props.user.userId
      }
    }).then(res => {
      const orders = res.data;
      this.setState({ orders: orders });
    }
    ).catch(error => {
      console.log("error with getting user orders!")
      this.setState({ responseError: error.response.data });

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
        Header: 'Started',
        accessor: 'startedDate',
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      },
      {
        Header: 'Last updated',
        accessor: 'lastUpdateDate',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }, {
        Header: 'Total price',
        accessor: 'totalPrice',
        style: styles.tdStyles,
        filterable: false,
        maxWidth: 200,
        resizable: false
      }, {
        Header: 'Current order state',
        accessor: 'orderState',
        style: styles.tdStyles,
        filterable: false,
        resizable: false
      }
    ];

    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        < ReactTable
          data={this.state.orders}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
        />
      </div>
    )
  }
}
