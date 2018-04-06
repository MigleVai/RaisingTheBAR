import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Logged from './Logged';
import FlatButton from 'material-ui/FlatButton';
import ShopppingCart from 'material-ui/svg-icons/action/shopping-cart';
import IconButton from 'material-ui/IconButton';


export default class UserPanel extends React.Component {

    render() {
        const styles =
            {
                labelStyle: {
                    fontWeight: 'bold',
                    textTransform: 'none'
                },
                buttonStyle: {
                    marginTop: '8%',
                },
                displayStyle:{
                    display:'inline-flex'
                },
            }

        return (
            <div style={styles.displayStyle}>
                <SearchBar />
                <Link to="/cart" ><IconButton><ShopppingCart /></IconButton></Link>
                <div>{this.props.islogged ? <Logged handleLogging={this.props.handleLogging} /> : <Link to={"/signin"}><FlatButton id="SigninButton" style={styles.buttonStyle} labelStyle={styles.labelStyle} label="Sign in" /></Link>}</div>
            </div>
        );
    }
}