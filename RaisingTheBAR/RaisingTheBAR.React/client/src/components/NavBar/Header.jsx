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
    return (
      <AppBar
        title={<Link to={"/"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
        titleStyle={styles.align}
        onLeftIconButtonClick={this.handleDrawerToggle}
        iconElementRight={<UserPanel handleLogging={this.props.handleLogging} islogged={this.props.islogged} />}
        style={styles.barStyle}
      >
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
        <Link to={"/products/all"} onClick={this.handleDrawerClose}><MenuItem>Everything</MenuItem></Link>
        <hr/>
        { 
          this.state.categories.map((category) => {
           return <Link to={"/products/"+category.name} key={category.id} onClick={this.handleDrawerClose}><MenuItem>{category.name}</MenuItem></Link>
          })
        }
        </Drawer>
      </AppBar>
    );
  }
}