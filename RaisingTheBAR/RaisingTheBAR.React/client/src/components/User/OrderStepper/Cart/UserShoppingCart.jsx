import React from 'react';
import CartTable from './CartTable';
import CartTotal from './CartTotal';
import axios from 'axios';
import ErrorMessage from '../../ErrorMessage';

export default class UserShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalCost: 0,
            totalAmountProducts: 0,
            responseError: '',
            toUpdateDeleted: false
        }
        this.getData = this.getData.bind(this);
        this.getDataAmount = this.getDataAmount.bind(this);
        this.getNotLoggedData = this.getNotLoggedData.bind(this);
        this.getInformationAndUpdate = this.getInformationAndUpdate.bind(this);
        this.mustUpdate = this.mustUpdate.bind(this);
    }
    mustUpdate() {
        this.setState(state => ({
            toUpdateDeleted: true
        }));
    }
    // NOT logged in/registered
    getNotLoggedData(array) {
        axios.post(`/api/Cart/GenerateCart`, JSON.parse(array))
            .then(res => {
                const cart = res.data;
                this.setState({ products: cart.products, totalCost: cart.completePrice });
                localStorage.setItem('totalCost', this.state.totalCost);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    // logged in/registered
    getData() {
        axios.get(`/api/Cart/GetCart`)
            .then(res => {
                const cart = res.data;
                this.setState({ products: cart.products, totalCost: cart.completePrice });
                localStorage.setItem('totalCost', this.state.totalCost);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    // logged in/registered
    getDataAmount() {
        axios.get(`/api/Cart/GetProductAmountInCart`)
            .then(res => {
                const totalAmountProducts = res.data;
                this.setState({ totalAmountProducts });
                localStorage.setItem('amount', totalAmountProducts);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.islogged !== nextProps.islogged) {
            return true;
        }
        if (this.state.products.length !== nextState.products.length) {
            return true;
        }
        if (this.state.totalCost !== nextState.totalCost) {
            return true;
        }
        if (nextState.toUpdateDeleted === true) {
            this.setState({ toUpdateDeleted: false });
            return true;
        }
        return false;
    }

    getInformationAndUpdate() {
        if (this.props.islogged === true) {
            this.getData();
            this.getDataAmount();
            localStorage.setItem('amount', this.state.totalAmountProducts);
        } else {
            var am = localStorage.getItem('productAmount');
            if (am == null) {
                this.setState({ totalAmountProducts: 0 });
            } else {
                this.setState({ totalAmountProducts: am });
            }
            var array = localStorage.getItem('cartNotLogged');
            if (array !== null) {
                this.getNotLoggedData(array);
            } else {
                this.setState({ products: [], totalCost: 0, totalAmountProducts: 0 });
                localStorage.setItem('totalCost', this.state.totalCost);
            }
        }
    }

    componentDidUpdate() {
        this.getInformationAndUpdate();
        this.props.update();
    }
    componentDidMount() {
        this.getInformationAndUpdate();
    }

    render() {
        var amount = this.props.productAmount;
        if(this.props.productAmount === 0 && this.state.totalCost !== 0){
            amount = this.state.products.length;
        }
        if(this.props.productAmount !== 0 && this.state.totalCost === 0){
            amount = 0;
        }
        if (this.props.mobile === false) {
            return (
                <div>
                    <ErrorMessage responseError={this.state.responseError} />
                    <CartTable mustUpdate={this.mustUpdate} update={this.props.update} handleAmount={this.props.handleAmount} cart={this.state.products} islogged={this.props.islogged} mobile={this.props.mobile} />
                    <CartTotal totalPrice={this.state.totalCost} totalAmount={amount} mobile={this.props.mobile} />
                </div>
            );
        } else {
            return (
                <div>
                    <ErrorMessage responseError={this.state.responseError} />
                    <CartTotal totalPrice={this.state.totalCost} totalAmount={amount} mobile={this.props.mobile} />
                    <CartTable mustUpdate={this.mustUpdate} update={this.props.update} handleAmount={this.props.handleAmount} cart={this.state.products} islogged={this.props.islogged} mobile={this.props.mobile} />
                </div>);

        }
    }
}

