import React from 'react';
import { NavLink } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  handleLoggingChange(props) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
    axios.defaults.headers.common['Authorization'] = '';
    this.props.handleLogging(false);
  }

  render() {
    const styles =
      {
        labelStyle: {
          fontWeight: 'bold',
          textTransform: 'none'
        },
        buttonStyle: {
          marginTop: '8%',
        },
        displayStyle: {
          display: 'inline-flex'
        },
      }

    return (
      <div style={styles.displayStyle}>
        <NavLink to="/admin/userlist" style={{padding: 10, color: 'black'}} activeStyle={{ backgroundColor: '#bfbfbf' }} >Users</NavLink>
        <NavLink to="/admin/editproducts" style={{padding: 10, color: 'black'}} activeStyle={{ backgroundColor: '#bfbfbf' }}>Products</NavLink>
        <NavLink to="/admin/excel" style={{padding: 10, color: 'black'}} activeStyle={{ backgroundColor: '#bfbfbf' }}>Excel</NavLink>
        <NavLink to="/admin/orders" style={{padding: 10, color: 'black'}} activeStyle={{ backgroundColor: '#bfbfbf' }} >Orders</NavLink>
        <NavLink to="/admin/categories" style={{padding: 10, color: 'black'}} activeStyle={{ backgroundColor: '#bfbfbf' }}>Categories</NavLink>
        <div>
          {this.props.isLogged ? 
            <NavLink to="/admin" ><FlatButton label="Log out" onClick={this.handleLoggingChange.bind(this)} /></NavLink>
            : null}
        </div>
      </div>
    );
  }
}