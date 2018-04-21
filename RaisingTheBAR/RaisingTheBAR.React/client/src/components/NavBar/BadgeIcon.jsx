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
                const totalAmountProducts = res.data;
                this.setState({ totalAmountProducts });
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
    shouldComponentUpdate() {
        //checks if bagde's amount is as 'amount'(registered) or 'productAmount'(not registered)
        var notLogged = localStorage.getItem('productAmount');
        var logged = localStorage.getItem('amount');
        if ((this.state.totalAmountProducts !== logged && logged !== null)
            ||
            (this.state.totalAmountProducts !== notLogged && notLogged !== null)) {
            if (notLogged !== null) {
                this.setState({ totalAmountProducts: notLogged });
            } else if (logged !== null) {
                this.setState({ totalAmountProducts: logged });
            } else { return false; }
            this.props.action();
            return true;
        }
        return false;
    }
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
                <Link to="/cart" >
                    <Badge
                        badgeContent={this.state.totalAmountProducts}
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