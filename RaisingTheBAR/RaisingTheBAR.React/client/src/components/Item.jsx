import React from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            responseError: '',
        }
        this.requestForProduct = this.requestForProduct.bind(this);
        this.getValueAsNumber = this.getValueAsNumber.bind(this);
    }
    amountTemp = 1;
    productAmount = 0;
    getValueAsNumber(input) {
        this.amountTemp = input;
    }
    componentDidMount() {
        axios.get(`/api/Product/GetProduct`, {
            params: {
                productId: this.props.match.params.productId
            }
        })
            .then(res => {
                const product = res.data;
                this.setState({ product });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }

    requestForProduct() {
        if (this.amountTemp !== 0) {
            if (this.props.islogged) {
                axios.post(`api/Cart/AddProductToCart`,
                    {
                        Id: this.state.product.id,
                        Amount: this.amountTemp
                    })
                    .then(res => {
                        const product = res.data;
                        this.setState({ product });
                        var am = localStorage.getItem('amount');
                        localStorage.setItem('amount', am + 1);
                    })
                    .catch(error => {
                        this.setState({ responseError: error.response.data });
                    });
            } else {
                const product = {
                    Id: this.state.product.id,
                    Amount: this.amountTemp
                }
                var cartOfProducts = [];
                if (localStorage.getItem('cartNotLogged') !== null) {
                    cartOfProducts = JSON.parse(localStorage.getItem('cartNotLogged'));
                }
                var item = cartOfProducts.find(function (element) {
                    if (element.Id === product.Id) {
                        return element;
                    }
                    return null;
                });
                if (item !== null && item !== undefined) {
                    var index = cartOfProducts.indexOf(item);
                    cartOfProducts[index].Amount = item.Amount + product.Amount;
                } else {
                    cartOfProducts.push(product);
                }
                localStorage.setItem('cartNotLogged', JSON.stringify(cartOfProducts));
                if(item !== null){
                    localStorage.setItem('productAmount', cartOfProducts.length);
                    // if (localStorage.getItem('productAmount') === null) {
                    //     this.productAmount++;
                    //     localStorage.setItem('productAmount', cartOfProducts.lenght);
                    // } else {
                    //     var am = localStorage.getItem('productAmount');
                    //     am++;
                    //     localStorage.setItem('productAmount', am);
                    // }
                }
            }
        }
    }

    render() {
        var setwidth = window.innerWidth * 0.4;
        var setheight = window.innerHeight * 0.6;
        if (setheight > setwidth) {
            setheight = setwidth;
        }
        const styles = {
            h3Style: {
                display: 'inline-block',
                textAlign: 'left',
                width: '100%',
                padding: 'none',
                margin: 'inherit'
            },
            imgStyle: {
                paddingLeft: '10%',
                paddingTop: '3%',
                paddingRight: '5%',
                maxWidth: '100%'
            },
            divStyle: {
                maxWidth: setwidth + 'px',
                minWidth: setwidth + 'px',
                maxHeight: setheight + 'px',
                minHeight: setheight + 'px',
                float: 'left',
            },
            textStyle: {
                textAlign: 'left',
                display: 'inline-block',
                float: 'left',
                wordWrap: 'break-word',
                maxWidth: '40%',
                paddingTop: '1%',
            },
            desStyle: {
                display: 'inline-block',
                paddingLeft: '3%',
                paddingTop: '4%',
                wordWrap: 'break-word',
            }
        }
        var path = this.props.location.pathname;
        var productId = this.props.match.params.productId;
        var rez = path.replace(productId, '').slice(0, -1);
        const price = parseFloat(this.state.product.price).toFixed(2);
        var valueInput = 1;
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <Breadcrumb pathname={rez} />
                <hr />
                <div style={styles.divStyle}><img style={styles.imgStyle} key={this.state.product.id} alt="product" src={(this.state.product.image)} />
                </div>
                <div style={styles.textStyle}>
                    <h3 style={styles.h3Style}>{this.state.product.name}</h3>
                    <div style={{ paddingTop: '4%' }}>
                        <p>Cost:  {price}€</p>
                        <p>Discount: </p>
                        <p style={{ display: 'inline-block' }}>Quantity:</p><NumericInput mobile min={1} max={100} value={valueInput} style={{ input: { width: '100px' } }} onChange={valueInput => this.getValueAsNumber(valueInput)} />
                        <br />
                        <Link to='/cart'>
                            <RaisedButton label="Add to Cart" onClick={this.requestForProduct} />
                        </Link>
                    </div>
                </div>
                <div>
                    <p>Description:</p>
                    <p style={{ paddingLeft: '3%' }}>{this.state.product.description}</p>
                </div>
            </div>
        )
    }
}