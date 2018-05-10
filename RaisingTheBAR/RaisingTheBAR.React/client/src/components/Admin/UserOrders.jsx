import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import matchSorter from 'match-sorter';

export default class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders : []
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    console.log("this.props.user")
    console.log(this.props.user.userId)
    var uri = '/api/Administrator/GetOrdersByUser';
    axios.get(uri, {
      userId: this.props.user.userId
    }
    ).then(res => {
      const orders = res.data;
      this.setState({ orders : orders });
      console.log("this is result:");
      console.log(res.data);
    }
    ).catch(error => {
      console.log("error with getting user orders!")
      console.log(error)
    });
  }
  render() {
    // console.log("this.props.user")
    // console.log(this.props.user)
    // console.log("this.state.user")
    // console.log(this.state.user)
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
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['startedDate'] }),
        filterAll: true
      },
      {
        Header: 'Last updated',
        accessor: 'lastUpdateDate',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['lastUpdateDate'] }),
        filterAll: true,
      }, {
        Header: 'Products',
        accessor: 'products',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['products'] }),
        filterAll: true
      }, {
        Header: 'Total price',
        accessor: 'totalPrice',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['averageCostOfOrders'] }),
        filterAll: true
      }
      // , {
      //   Header: 'Block',
      //   accessor: 'blocked',
      //   Cell: user => <div>{
      //     user.original.blocked === false ?
      //       <FlatButton label="Block user" backgroundColor="#FF0000" onClick={() => this.handleBlockEvent(user.original)} />
      //       :
      //       <FlatButton label="Unblock user" backgroundColor="#00FF00" onClick={() => this.handleBlockEvent(user.original)} />
      //   }</div>,
      //   style: styles.tdStyles,
      //   maxWidth: 200,
      //   resizable: false,
      //   filterMethod: (filter, rows) =>
      //     matchSorter(rows, filter.value, { keys: ['blocked'] }),
      //   filterAll: true
      // }
    ];

    return (
      <div>
        < ReactTable
          data={this.state.orders}
          columns={columns}
          defaultPageSize={10}
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
