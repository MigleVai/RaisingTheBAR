import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import UserPanel from './UserPanel';

import { MuiThemeProvider } from 'material-ui/styles';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged: this.props.logged
    };
  }

  handleDrawerToggle = () => this.setState({ open: !this.state.open });

  handleDrawerClose = () => this.setState({ open: false });

  render() {
    const styles = {
      title: {
        cursor: 'default',
      },
      align: {
        textAlign: 'left',
      },
      textStyle:{
        textTransform: 'none',
      },
      barStyle:{
        backgroundColor: '#929292'
      }
    };
    return (
      <MuiThemeProvider>
        <AppBar
          title={<Link to={"/"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the bar" /></Link>}
          titleStyle={styles.align}
          onLeftIconButtonClick={this.handleDrawerToggle}
          iconElementRight={<UserPanel {...this.props}/>}
          style={styles.barStyle} 
        >
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <Link to={"/allitems/"}>
              <MenuItem onClick={this.handleDrawerClose}>All items</MenuItem>
            </Link>
            <MenuItem onClick={this.handleDrawerClose}>Work in progress...</MenuItem>
          </Drawer>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}