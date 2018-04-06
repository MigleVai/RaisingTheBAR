import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/social/person';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Logged extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: this.props.logged
    };
  }

  handleLoggingChange(props) {
    localStorage.removeItem('jwtToken');
    axios.defaults.headers.common['Authorization'] = '';
    this.props.onLogging(!this.props.logged);
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={<IconButton><Person /></IconButton>}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Link to="/orders">
          <MenuItem primaryText="Orders" />
        </Link>
        <Link to="/settings">
          <MenuItem primaryText="Settings" />
        </Link>
        <Link to="/">
          <MenuItem primaryText="Sign out" onClick={this.handleLoggingChange.bind(this)} />
        </Link>
      </IconMenu>
    );
  }
}
