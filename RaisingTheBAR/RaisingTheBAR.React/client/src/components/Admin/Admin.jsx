import React from 'react';
import UserList from './UserList';
import AdminPanel from './AdminPanel';
import EditProducts from './ProductTable/EditProducts';
import AppBar from 'material-ui/AppBar';
import AdminAuthentication from './AdminAuthentication';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    }
  }
  componentDidMount() {
    if (localStorage.getItem('jwtToken') && (localStorage.getItem('role') === 'administrator')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      this.setState({ logged: true });
    }
  }
  handleLogging = (logged) => {
    this.setState({ logged: logged });
  }
  render() {
    const styles = {
      title: {
        cursor: 'default',
      },
      align: {
        textAlign: 'left',
      },
      textStyle: {
        textTransform: 'none',
      },
      barStyle: {
        backgroundColor: '#929292'
      }
    };
    return (
      <div>
        {this.state.logged ?
          <div>
            <AppBar
              title={<Link to={"/admin"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
              titleStyle={styles.align}
              iconElementRight={<AdminPanel handleLogging={this.handleLogging} isLogged={this.state.logged} />}
              style={styles.barStyle}
            >
            </AppBar>
            <h2>My role is {localStorage.getItem('role')}</h2>
            <Route path="/admin/userlist" render={(props) => <UserList  {...props} />} />
            <Route path="/admin/editproducts" render={(props) => <EditProducts  {...props} />} />
          </div>
          :
          <AdminAuthentication handleLogging={this.handleLogging} />
        }
      </div>
    )
  }
}