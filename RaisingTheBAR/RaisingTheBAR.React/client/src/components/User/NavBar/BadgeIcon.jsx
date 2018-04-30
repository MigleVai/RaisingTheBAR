import React from 'react';
import { Link } from 'react-router-dom';
import ShopppingCart from 'material-ui/svg-icons/action/shopping-cart';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import ErrorMessage from '../ErrorMessage';
import axios from 'axios';

export default class BadgeIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmountProducts: 0,
            responseError: '',
        }
        this.getDataAmount = this.getDataAmount.bind(this);
    }
    // logged in/registered
    getDataAmount() {
        axios.get(`/api/Cart/GetProductAmountInCart`)
            .then(res => {
                const result = res.data;
                this.setState({ totalAmountProducts: result });
                localStorage.setItem('amount', this.state.totalAmountProducts);
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        if (this.props.islogged === true) {
            // logged in/registered
            this.getDataAmount();
        } else {
            // NOT logged in/registered - amount is 'productAmount'
            var am = localStorage.getItem('productAmount');
            if (am !== null) {
                this.setState({ totalAmountProducts: am });
            }
        }
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.islogged === true && prevProps.islogged === false) {
    //         this.getDataAmount();
    //     } else if (this.props.islogged === false && prevProps.islogged === true) {
    //         this.setState({ totalAmountProducts: 0 });
    //     } else if (this.props.islogged === false && prevProps.islogged === false) {
    //         var notLogged = localStorage.getItem('productAmount');
    //         this.setState({ totalAmountProducts: notLogged });
    //     } else {
    //         localStorage.setItem('productAmount', 0);
    //     }
    // }
    // shouldComponentUpdate(nextProps) {
    //     //checks if badge's amount is as 'amount'(registered) or 'productAmount'(not registered)
    //     if (this.props.islogged !== nextProps.islogged) {
    //         return true;
    //     }
    //     var notLogged = localStorage.getItem('productAmount');
    //     var logged = localStorage.getItem('amount');
    //     // eslint-disable-next-line
    //     if ((this.state.totalAmountProducts != logged && logged !== null) //DO NOT CHANGE TO !==
    //         ||
    //         // eslint-disable-next-line
    //         (this.state.totalAmountProducts != notLogged && notLogged !== null)) {//DO NOT CHANGE TO !== OR MIGLE WILL KILL
    //         if (notLogged !== null) {
    //             return true;
    //         } else if (logged !== null) {
    //             return true;
    //         } else { return false; }
    //     }
    //     // eslint-disable-next-line
    //     if (logged === null && notLogged === null && this.state.totalAmountProducts != 0) {
    //         return true;
    //     }
    //     return false;
    // }
    render() {
        const styles =
            {
                badgeStyle: {
                    padding: 'none',
                    paddingRight: '24px',
                }
            }
        return (
            <div >
                <Link to="/shop/cart" >
                    <Badge
                        badgeContent={this.props.productAmount}//this.state.totalAmountProducts}
                        primary={true}
                        badgeStyle={{ right: 12 }}
                        style={styles.badgeStyle}
                    >
                        <IconButton>
                            <ShopppingCart />
                        </IconButton>
                    </Badge>
                </Link>
                <ErrorMessage responseError={this.state.responseError} />
            </div>
        );
    }
}