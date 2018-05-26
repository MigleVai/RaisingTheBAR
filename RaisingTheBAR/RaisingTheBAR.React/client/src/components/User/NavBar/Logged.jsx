import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/social/person';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Logged extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: false
    };
  }

  handleLoggingChange(props) {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('amount');
    axios.defaults.headers.common['Authorization'] = '';
    this.props.handleLogging(false);
    this.handleDrawerToggle();
  }
  handleDrawerToggle = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <IconMenu
        open={this.state.open}
        iconButtonElement={<IconButton><Person /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        onClick={() => this.handleDrawerToggle()}
        onRequestChange={(open) => this.handleDrawerToggle()}

      >
        <Link to="/shop/orders">
          <MenuItem primaryText="Orders" onClick={this.handleDrawerToggle}/>
        </Link>
        <Link to="/shop/settings">
          <MenuItem primaryText="Settings" onClick={this.handleDrawerToggle} />
        </Link>
        <Link to="/shop">
          <MenuItem primaryText="Sign out" onClick={this.handleLoggingChange.bind(this)} /> 
        </Link>
      </IconMenu>
    );
  }
}
