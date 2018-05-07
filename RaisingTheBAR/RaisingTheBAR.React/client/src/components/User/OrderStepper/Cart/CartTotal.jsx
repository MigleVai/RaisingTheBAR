import React from 'react';
import Paper from 'material-ui/Paper';
import ToPriceDisplay from '../../functions/ToPriceDisplay';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class CartTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const styles = {
            paperStyle: {
                textAlign: 'center',
                padding: '10px'
            },
            pageStyle: {
                position: 'fixed',
                width: '20%',
                right: '5%',
                display: 'inline-grid',
                top: '27%'
            }
        };
        var productName = 'products';
        if (this.props.totalAmount === 1) {
            productName = 'product';
        }
        if (this.props.mobile === false) {
            return (
                <div style={styles.pageStyle}>
                    <Paper style={styles.paperStyle} zDepth={1}>
                        <h3>Order Summary</h3>
                        <hr />
                        <p>{this.props.totalAmount} {productName}</p>
                        <p>Product Total: <b>{ToPriceDisplay(this.props.totalPrice)}</b></p>
                    </Paper>
                </div>
            )
        } else {
            const actions = [
                <FlatButton
                    label="Ok"
                    primary={true}
                    onClick={this.handleClose}
                />
            ];

            return (
                <div>
                    <RaisedButton
                        label='Summary'
                        primary={true}
                        onClick={this.handleOpen}
                    />
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <h3>Order Summary</h3>
                        <hr />
                        <p>{this.props.totalAmount} {productName}</p>
                        <p>Product Total: <b>{ToPriceDisplay(this.props.totalPrice)}</b></p>
                    </Dialog>
                </div>
            );
        }
    }
}