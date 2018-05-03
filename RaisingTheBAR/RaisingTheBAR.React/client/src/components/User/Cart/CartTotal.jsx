import React from 'react';
import Paper from 'material-ui/Paper';


export default class CartTotal extends React.Component {
    render() {
        const styles = {
            paperStyle: {
                textAlign: 'center',
            },
            pageStyle:{
                position: 'fixed',
                width: '20%',
                right: '5%',
                display: 'inline-grid'
            }
        };
        var productName = 'products';
        if(this.props.totalAmount === 1){
            productName = 'product';
        }
        return (
            <div style={styles.pageStyle}>
                <Paper style={styles.paperStyle} zDepth={1}>
                    <h3>Order Summary</h3>
                    <hr/>
                    <p>{this.props.totalAmount} {productName}</p>
                    <p>Product Total: <b>{this.props.totalPrice}</b></p>
                </Paper>
            </div>
        )
    }
}