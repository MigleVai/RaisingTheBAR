import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/admin/userlist" ><FlatButton label="User list" /></Link>
        <Link to="/admin/editproducts" ><FlatButton label="Edit products" /></Link>
        <Link to="/admin/excel" ><FlatButton label="Excel import/export" /></Link>
        <div>
          {this.props.isLogged ? 
            <Link to="/admin" ><FlatButton label="Log out" onClick={this.handleLoggingChange.bind(this)} /></Link>
            : null}
        </div>
      </div>
    );
  }
}