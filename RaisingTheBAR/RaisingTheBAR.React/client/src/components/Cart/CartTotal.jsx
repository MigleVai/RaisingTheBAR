import React from 'react';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

export default class CartTotal extends React.Component {
    render() {
        const styles = {
            paperStyle: {
                textAlign: 'center',
                display: 'inline-block',
                position: 'fixed',
                width: '20%'
            }
        };
        var productName = 'products';
        if(this.props.totalAmount === 1){
            productName = 'product';
        }
        return (
            <div>
                <Paper style={styles.paperStyle} zDepth={1}>
                    <h3>Order Summary</h3>
                    <hr/>
                    <p>{this.props.totalAmount} {productName}</p>
                    <p>Product Total: <b>{this.props.totalPrice}</b></p>
                    <hr/>
                    <Link to="/payment" ><FlatButton label="PAY" /></Link>
                </Paper>
            </div>
        )
    }
}