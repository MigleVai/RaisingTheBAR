import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

export default class UserShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: this.props.logged
        };
    }
    render() {
        return (
            <div>
                <h1>SHOPPING CART</h1>
                <Link to="/payment/" {...this.props}><FlatButton label="PAY"/></Link>
            </div>
        );
    }
}

