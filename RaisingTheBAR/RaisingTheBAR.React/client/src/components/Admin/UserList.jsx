import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import axios from 'axios';

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
      })
      .catch(error => {
        console.log("error with getting user data!")
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
        Header: 'Email',
        accessor: 'email',
        style: styles.tdStyles,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['email'] }),
        filterAll: true
      },
      {
        Header: 'First name',
        accessor: 'firstName',
        style: styles.tdStyles,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['firstName'] }),
        filterAll: true,
      }, {
        Header: 'Last Name',
        accessor: 'lastName',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ['lastName'] }),
        filterAll: true
      }, {
        Header: 'Blocked',
        accessor: 'blocked',
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
              <h1>future implementation of orders + block button</h1>
            )
          }}
        />
      </div>
    )
  }
}