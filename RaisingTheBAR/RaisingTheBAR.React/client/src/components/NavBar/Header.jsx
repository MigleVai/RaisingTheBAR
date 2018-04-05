import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import axios from 'axios';

import UserPanel from './UserPanel';


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged: this.props.logged,
      categories: []
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/Category/GetAllCategories`)
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(function (error) {
        // show error
      });
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
      textStyle: {
        textTransform: 'none',
      },
      barStyle: {
        backgroundColor: '#929292'
      }
    };
    const categoriesInList = this.state.categories.map(function (category) {
      return <MenuItem>{category.name}</MenuItem>  //onClick={this.handleDrawerClose}
    });
    return (
      <AppBar
        title={<Link to={"/"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
        titleStyle={styles.align}
        onLeftIconButtonClick={this.handleDrawerToggle}
        iconElementRight={<UserPanel {...this.props} />}
        style={styles.barStyle}
      >
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <Link to={"/allitems"}>
            {categoriesInList}
          </Link>
        </Drawer>
      </AppBar>
    );
  }
}