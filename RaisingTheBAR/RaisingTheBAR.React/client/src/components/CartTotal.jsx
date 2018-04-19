import React from 'react';
import ErrorMessage from './ErrorMessage';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

export default class CartTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: '',
            totalAmountProducts: '',
            responseError: '',
        }
        this.getDataCost = this.getDataCost.bind(this);
        this.getDataAmount = this.getDataAmount.bind(this);
    }
    getDataCost() {
        axios.get(`/api/Cart/GetCart`)
            .then(res => {
                const cart = res.data;
                this.setState({ cart });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    getDataAmount() {
        axios.get(`/api/Cart/GetProductAmountInCart`)
            .then(res => {
                const totalAmountProducts = res.data;
                this.setState({ totalAmountProducts });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        this.getDataCost();
        this.getDataAmount();
    }
    componentDidUpdate(){
        this.getDataCost();
        this.getDataAmount();
    }
    render() {
        const styles = {
            paperStyle: {
                textAlign: 'center',
                display: 'inline-block',
                position: 'fixed',
                width: '20%'
            }
        };
        const totalCost = this.state.cart.completePrice;
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <Paper style={styles.paperStyle} zDepth={1}>
                    <h3>Order Summery</h3>
                    <hr/>
                    <p>{this.state.totalAmountProducts} products</p>
                    <p>Product Total: <b>{totalCost}</b></p>
                    <hr/>
                    <Link to="/payment" ><FlatButton label="PAY" /></Link>
                </Paper>
            </div>
        )
    }
}