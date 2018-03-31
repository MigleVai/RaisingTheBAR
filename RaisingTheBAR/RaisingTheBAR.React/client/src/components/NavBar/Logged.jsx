import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/social/person';
import axios from 'axios';

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
        <MenuItem primaryText="History" />
        <MenuItem primaryText="Sign out" onClick={this.handleLoggingChange.bind(this)} />
      </IconMenu>
    );
  }
}
