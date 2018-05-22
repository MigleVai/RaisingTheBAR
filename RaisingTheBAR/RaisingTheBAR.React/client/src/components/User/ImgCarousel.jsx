import React from 'react'
import Slider from 'react-slick'
import axios from 'axios';
import ErrorMessage from './ErrorMessage';

export default class ImgCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseError: '',
            featuredProducts: []
        };
        this.checkIfDiscount = this.checkIfDiscount.bind(this);
    }
    componentDidMount() {
        axios.get(`/api/Product/GetFeaturedProducts`)
            .then(res => {
                const result = res.data;
                this.setState({ featuredProducts: result });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }

    checkIfDiscount(product) {
        var price = parseFloat(product.price).toFixed(2);
        if (product.discountedPrice !== 0) {
            var discount = parseFloat(product.discountedPrice).toFixed(2);
            return <h4><s>{price + '€'}</s><br /><span style={{ color: '#D32F2F', fontSize: '30px' }}>{discount + '€'}</span></h4>
        } else {
            return <h4>{price + '€'}</h4>;
        }
    }

    render() {
        var innerHeight = window.innerHeight * 0.7;
        var settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5001,
            arrows: false,
        };
        const styles = {
            imgStyle: {
                margin: 'auto',
                maxWidth: '70%',
                maxHeight: innerHeight*0.8,
                cursor: 'pointer'
            }
        };
        return (
            <div>
                <ErrorMessage responseError={this.state.responseError} />
                <Slider {...settings} >
                    {/* <div > */}
                        {this.state.featuredProducts.map((product) => {
                            return (
                                <div key={product.id} style={{height: innerHeight}}>
                                    <h3>{product.name}</h3>
                                    <img style={styles.imgStyle} src={product.images} alt="Featured product" onClick={() => this.props.history.push('/shop/products/all/' + product.id)} />
                                    {this.checkIfDiscount(product)}
                                </div>);
                        })}
                    {/* </div> */}
                </Slider>
            </div>
        );
    }
}