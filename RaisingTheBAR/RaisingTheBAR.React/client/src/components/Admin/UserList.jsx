import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import UserOrderDetails from './UserOrderDetails'
import update from 'immutability-helper';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    var uri = '/api/Administrator/GetUsers';
    axios.get(uri)
      .then(res => {
        const users = res.data;
        this.setState({ users: users });
        // console.log(this.state.users);
      })
      .catch(error => {
        console.log("error with getting user data!")
        console.log(error)
      });
  }
  handleBlockEvent(user) {
    var blockUri = '/api/Administrator/ChangeBlock';
    axios.post(blockUri, {
      email: user.email,
      blocked: !user.blocked
    }).catch(error => {
      console.log("error with blocking/unblocking user!")
      console.log(error)
    });
    var index = this.state.users.indexOf(user);
    this.setState({
      users: update(this.state.users, {
        [index]: {
          blocked: { $set: !user.blocked },
        }
      })
    })
  }

  render() {
    const styles = {
      tdStyles: {
        margin: 'auto',
      }
    };

    const columns = [
      {
        Header: 'Email',
        accessor: 'email',
        style: styles.tdStyles,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['email'] }),
        filterAll: true
      },
      {
        Header: 'Order count',
        accessor: 'orderCount',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['orderCount'] }),
        filterAll: true,
      }, {
        Header: 'Total cost of orders',
        accessor: 'totalCostOfOrders',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['totalCostOfOrders'] }),
        filterAll: true
      }, {
        Header: 'Average cost of orders',
        accessor: 'averageCostOfOrders',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['averageCostOfOrders'] }),
        filterAll: true
      }, {
        Header: 'Block',
        accessor: 'blocked',
        Cell: user => <div>{
          user.original.blocked === false ?
            <FlatButton label="Block user" backgroundColor="#FF0000" onClick={() => this.handleBlockEvent(user.original)} />
            :
            <FlatButton label="Unblock user" backgroundColor="#00FF00" onClick={() => this.handleBlockEvent(user.original)} />
        }</div>,
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['blocked'] }),
        filterAll: true
      }
    ];

    return (
      <div>
        < ReactTable
          data={this.state.users}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          SubComponent={row => {
            return (
              <div>
                <UserOrderDetails user={row.original} />
              </div>
            )
          }}
        />
      </div>
    )
  }
}