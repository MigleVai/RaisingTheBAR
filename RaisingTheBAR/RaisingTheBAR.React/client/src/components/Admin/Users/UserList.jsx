import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';
import UserOrders from './UserOrders'
import update from 'immutability-helper';
import ErrorMessage from '../../User/ErrorMessage';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      responseError: ''
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
      })
      .catch(error => {
        console.log("error with getting user data!")
        this.setState({ responseError: error.response.data });
      });
  }
  handleBlockEvent(user) {
    var blockUri = '/api/Administrator/ChangeBlock';
    axios.post(blockUri, {
      email: user.email,
      blocked: !user.blocked
    }).catch(error => {
      console.log("error with blocking/unblocking user!")
      this.setState({ responseError: error.response.data });
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
        filterable: false
      },
      {
        Header: 'Order count',
        accessor: 'orderCount',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterable: false
      }, {
        Header: 'Total cost of orders',
        accessor: 'totalCostOfOrders',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterable: false
      }, {
        Header: 'Average cost of orders',
        accessor: 'averageCostOfOrders',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterable: false
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
        filterable: false
      }
    ];

    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
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
                <UserOrders user={row.original} />
              </div>
            )
          }}
        />
      </div>
    )
  }
}