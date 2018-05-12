import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';

export default class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
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
      console.log("this is result:");
      console.log(res.data);
    }
    ).catch(error => {
      console.log("error with getting user orders!")
      console.log(error)
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
