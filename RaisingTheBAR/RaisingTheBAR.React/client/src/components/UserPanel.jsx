import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logged from './Logged';
import FlatButton from 'material-ui/FlatButton';
import ShopppingCart from 'material-ui/svg-icons/action/shopping-cart';
import IconButton from 'material-ui/IconButton';

export default class UserPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: this.props.logged
        };
    }

    render() {
        return (
            <div style={{ display: "flex"}}>
                <SearchBar/>
                <Link to="/cart/" {...this.props}><IconButton><ShopppingCart /></IconButton></Link>
                <div>{this.props.logged ? <Logged {...this.props}/> : <Link to={"/signin/"}><FlatButton label="Sign in" backgroundColor="Red" hoverColor="Green" /></Link>}</div>            
            </div>
        );
    }
}