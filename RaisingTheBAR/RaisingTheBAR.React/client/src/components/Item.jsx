import React from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import RaisedButton from 'material-ui/RaisedButton';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
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
            .catch(function (error) {
                // show error
            });
    }

    render() {
        var innerWidth = window.innerWidth;
        var setwidth = innerWidth * 0.3;
        const styles = {
            h3Style: {
                display: 'inline-block',
                textAlign: 'left',
                width: '100%',
                paddingLeft: '10%',
            },
            imgStyle: {
                marginLeft: '10%',
                marginTop: '3%',
                marginRight: '3%',
                float: 'left',
                maxWidth: setwidth + 'px',
                minWidth: setwidth + 'px',
            },
            textStyle: {
                textAlign: 'left',
                display: 'flow-root',
                paddingTop: '3%'
            }
        }
        var path = this.props.location.pathname;
        var productId = this.props.match.params.productId;
        var rez = path.replace(productId, '').slice(0, -1);
        const price = parseFloat(this.state.product.price).toFixed(2);
        return (
            <div>
                <Breadcrumb pathname={rez} />
                <h3 style={styles.h3Style}>{this.state.product.name}</h3>
                <img style={styles.imgStyle} key={this.state.product.id} alt="No Image" src={(this.state.product.image)} />
                <div style={styles.textStyle}>
                    <p>Cost:  {price}€</p>
                    <p>Description:</p>
                    <p style={{ paddingLeft: '3%' }}>{this.state.product.description}</p>
                    <p>Quantity: </p><NumericInput min={0} max={100} value={0} />
                    <br />
                    <div style={{paddingTop: '3%'}}>
                        <RaisedButton label="Buy Now" />
                        <RaisedButton label="Add to Cart" />
                    </div>
                </div>
            </div>
        )
    }
}