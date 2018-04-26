import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';

import RightHeader from './RightHeader';


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      categories: [],
      responseError: '',
      update: false
    };
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handler = this.handler.bind(this)
  }
  handler() {
    this.setState({
      update: true
    })
  }
  shouldComponentUpdate(nextProps){
    if(this.props.islogged === nextProps.islogged || this.props.islogged !== nextProps.islogged){
      return true;
    }
    if(this.state.open !== nextProps.open){
      return true;
    }
    if(this.state.update){
      this.setState({update: false});
      return true;
    }
    return false;
  }
  componentDidMount() {
    axios.get(`/api/Category/GetAllCategories`)
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch(error => {
        this.setState({ responseError: error.response.data });
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
      <div>
        <AppBar
          title={<Link to={"/"}><FlatButton hoverColor='none' labelStyle={styles.textStyle} label="Raising the BAR" /></Link>}
          titleStyle={styles.align}
          onLeftIconButtonClick={this.handleDrawerToggle}
          iconElementRight={<RightHeader action={this.handler} productAmount={this.props.productAmount} handleLogging={this.props.handleLogging} islogged={this.props.islogged} />}
          style={styles.barStyle}
        >
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
          >
            <Link to={"/products/all"} onClick={this.handleDrawerClose}><MenuItem>Everything</MenuItem></Link>
            <hr />
            {
              this.state.categories.map((category) => {
                return <Link to={"/products/" + category.name} key={category.id} onClick={this.handleDrawerClose}><MenuItem>{category.name}</MenuItem></Link>
              })
            }
          </Drawer>
        </AppBar>
        <ErrorMessage responseError={this.state.responseError} />
      </div>
    );
  }
}