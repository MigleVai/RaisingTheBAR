import React from 'react';
import UserList from './UserList';
import OrderList from './OrderList';
import AdminPanel from './AdminPanel';
import EditProducts from './ProductTable/EditProducts';
import EditCategories from './EditCategories';
import Excel from './Excel';
import AppBar from 'material-ui/AppBar';
import AdminAuthentication from './AdminAuthentication';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      open: false
    }
    this.checkError = this.checkError.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('jwtToken') && (localStorage.getItem('role') === 'administrator')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
      this.setState({ logged: true });
      axios.get(`/api/Administrator/CheckToken`)
        .then(res => {
        })
        .catch(error => {
          if (error.response !== undefined && error.response.status === 401) {
            this.setState({ open: true });
          }
        });
    }
  }
  handleLogging = (logged) => {
    this.setState({ logged: logged });
  }
  handleClose = () => {
    this.setState({ open: false, logged: false });
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('role');
  };
  checkError() {
    if (this.state.open) {
      const actions = [
        <Link to={"/admin"}><FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.handleClose}
        /></Link>,
      ];
      return (
        <div>
          <Dialog
            title="Notification"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            Your session has ended!
            <br />
            Please re-login.
        </Dialog>
        </div>
      );
    }
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
              title={<Link to={"/admin"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR admin page" /></Link>}
              titleStyle={styles.align}
              iconElementRight={<AdminPanel handleLogging={this.handleLogging} isLogged={this.state.logged} />}
              style={styles.barStyle}
              iconElementLeft={(<div />)}
            >
            </AppBar>
            <Route exact path="/admin" render={(props) => <OrderList {...props} />} />
            <Route path="/admin/userlist" render={(props) => <UserList  {...props} />} />
            <Route path="/admin/editproducts" render={(props) => <EditProducts  {...props} />} />
            <Route path="/admin/excel" render={(props) => <Excel {...props} />} />
            <Route path="/admin/categories" render={(props) => <EditCategories {...props} />} />
          </div>
          :
          <AdminAuthentication handleLogging={this.handleLogging} />
        }
        {this.checkError()}
      </div>
    )
  }
}