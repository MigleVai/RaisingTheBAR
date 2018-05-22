import React from 'react';
import Breadcrumb from '../Breadcrumb';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import RaisedButton from 'material-ui/RaisedButton';
import ErrorMessage from '../ErrorMessage';
import Snackbar from 'material-ui/Snackbar';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';
import Paper from 'material-ui/Paper';
import Slider from 'react-slick';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            responseError: '',
            open: false,
        }
        this.requestForProduct = this.requestForProduct.bind(this);
        this.getValueAsNumber = this.getValueAsNumber.bind(this);
        this.discountExists = this.discountExists.bind(this);
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
                        const result = res.data;
                        this.props.handleAmount(result);
                        // localStorage.setItem('amount', result);
                        this.handleClick();
                    })
                    .catch(error => {
                        this.setState({ responseError: error.response.data });
                    });
            } else {
                const product = {
                    Id: this.state.product.id.toUpperCase(),
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
                if (item !== null) {
                    localStorage.setItem('productAmount', cartOfProducts.length);
                    this.props.handleAmount(cartOfProducts.length);
                }
                this.handleClick();
            }
        }
    }
    discountExists() {
        if (this.state.product.discountedPrice !== 0) {
            return <div>
                <p><s>Cost:  {ToPriceDisplay(this.state.product.price)}</s></p>
                <p>Discount: {ToPriceDisplay(this.state.product.discountedPrice)}</p>
            </div>;
        } else {
            return <p>Cost:  {ToPriceDisplay(this.state.product.price)}</p>;
        }
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        var setwidth = window.innerWidth * 0.4;
        var setheight = window.innerHeight * 0.6;
        var paddingLeftImg = '5%';
        var paddingRightImg = '3%';
        var paddingTopImg = '3%';
        var setTotalWidth = 'none';
        var floatImg = 'left';
        var paddingDownImg = 'none';
        var displayDescrip = 'inline-block';
        var displayCostQuantity = 'block';
        if (window.innerWidth < 750) {
            setwidth = 'none';
            setheight = setheight * 0.4;
            paddingLeftImg = '20%';
            paddingRightImg = 'none';
            paddingTopImg = 'none';
            setTotalWidth = '80%';
            floatImg = 'none';
            paddingDownImg = '5%';
            displayCostQuantity = 'inline';
            if (window.innerWidth < 470) {
                displayDescrip = 'contents';
            }
        }
        const styles = {
            h3Style: {
                display: 'block',
                textAlign: 'left',
                paddingLeft: '2%',
                position: 'absolute'
            },
            imgStyle: {
                maxWidth: setwidth,
                maxHeight: setheight,
                paddingLeft: '5px',
                paddingRight: '5px'
            },
            divStyle: {
                maxWidth: setwidth,
                minWidth: setwidth,
                maxHeight: setheight,
                float: floatImg,
                width: setTotalWidth,
                paddingLeft: paddingLeftImg,
                paddingTop: paddingTopImg,
                paddingRight: paddingRightImg,
                paddingBottom: paddingDownImg
            },
            paperStyle: {
                margin: 20,
                textAlign: 'left',
                display: 'flex',
                padding: 10
            },
            descriptionStyle: {
                paddingLeft: '3%',
                wordWrap: 'break-word',
                maxWidth: '80%'
            }
        }
        var path = this.props.location.pathname;
        var productId = this.props.match.params.productId;
        var rez = path.replace(productId, '').slice(0, -1);
        var valueInput = 1;
        var settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            arrows: false
        };
        if (this.state.product.images) {
            var images = this.state.product.images.map((image, i) =>
                <img style={styles.imgStyle} key={i} alt="product" src={(image)} />
            );
        }
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <Breadcrumb pathname={rez} />
                <hr />
                <div style={styles.divStyle}>
                    <Slider {...settings}>
                        {images}
                    </Slider>
                </div>
                <Paper style={styles.paperStyle} zDepth={1}>
                    <h3 style={styles.h3Style}>{this.state.product.name}</h3>
                    <div style={{ paddingTop: '9%', width: '90%' }}>
                        <div style={{ display: displayCostQuantity, paddingTop: '3%', paddingLeft: '4%' }}>
                            {this.discountExists()}
                            <p style={{ display: 'inline-block' }}>Quantity:  </p><span style={{ marginLeft: '2%' }}><NumericInput mobile min={1} max={100} value={valueInput} style={{ input: { width: '100px' } }} onChange={valueInput => this.getValueAsNumber(valueInput)} /></span>
                        </div>
                        <div style={{
                            display: displayDescrip,
                            float: 'right',
                            paddingLeft: '5%',
                            paddingRight: '2%',
                            maxWidth: '60%',
                            marginTop: '-10%',
                        }}>
                            <p>Description:</p>
                            <p>{this.state.product.description}</p>
                        </div>
                        <br />
                        <RaisedButton style={{ marginLeft: '6%' }} label="Add to Cart" onClick={this.requestForProduct} />
                        <Snackbar
                            open={this.state.open}
                            message={"Added " + this.state.product.name + " to cart!"}
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}