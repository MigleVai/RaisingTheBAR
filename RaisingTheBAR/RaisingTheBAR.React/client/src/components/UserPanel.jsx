import React from 'react';
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
        const styles =
            {
                labelStyle: {
                    fontWeight: 'bold',
                    textTransform: 'none'
                },
                buttonStyle: {
                    margin: '8%',
                }
            }

        return (
            <div style={{ display: "flex" }}>
                <SearchBar />
                <Link to="/cart/" {...this.props}><IconButton><ShopppingCart /></IconButton></Link>
                <div>{this.props.logged ? <Logged {...this.props} /> : <Link to={"/signin/"}><FlatButton style={styles.buttonStyle} labelStyle={styles.labelStyle} label="Sign in" /></Link>}</div>
            </div>
        );
    }
}