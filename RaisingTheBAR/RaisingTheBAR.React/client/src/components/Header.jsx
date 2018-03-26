import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import Logged from './Logged';

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
        textAlign: 'left'
      }
    };
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title={<Link to={"/"}><FlatButton label="Rasing the bar"/></Link>}
              titleStyle={styles.align}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonClick={this.handleDrawerToggle}
              iconElementRight={this.props.logged ? <Logged /> : <Link to={"/signin/"}><FlatButton label="Sign in" backgroundColor="Red" hoverColor="Green" /></Link>}
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
              {/* <SearchBar /> */}
            </AppBar>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}