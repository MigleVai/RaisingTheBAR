import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import { MuiThemeProvider } from 'material-ui/styles';

export default class DrawerSimpleExample extends React.Component {

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
          <AppBar
            title={<span style={styles.title}>Raise the BAR</span>}
            titleStyle={styles.align}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonClick={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
            <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
          </Drawer>
        </MuiThemeProvider>
      </div>
    );
  }
}
