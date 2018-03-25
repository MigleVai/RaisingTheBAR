import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

import { MuiThemeProvider } from 'material-ui/styles';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

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
              title={<span style={styles.title}>Raise the BAR</span>}
              titleStyle={styles.align}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonClick={this.handleToggle}
            //iconElementRight={}
            >
              <Drawer
                docked={false}
                width={200}
                open={this.state.open}
                onRequestChange={(open) => this.setState({ open })}
              >
                <Link to={"/allitems/"}>
                  <MenuItem onClick={this.handleClose}>All items</MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>Work in progress...</MenuItem>
              </Drawer>
              <SearchBar />
              <Link to={"/signin/"}>  
                <FlatButton  label="Sign in" backgroundColor="Red" hoverColor="Green"/>
              </Link>
            </AppBar>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}