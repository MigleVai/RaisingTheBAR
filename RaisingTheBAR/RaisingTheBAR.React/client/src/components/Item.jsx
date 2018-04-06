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
        return (
            <div>
                <Breadcrumb pathname={rez} />
                <hr />
                <div style={styles.divStyle}><img style={styles.imgStyle} key={this.state.product.id} alt="No Image" src={(this.state.product.image)} />
                </div>
                <div style={styles.textStyle}>
                    <h3 style={styles.h3Style}>{this.state.product.name}</h3>
                    <div style={{ paddingTop: '4%' }}>
                        <p>Cost:  {price}€</p>
                        <p>Discount: </p>
                        <p style={{display: 'inline-block'}}>Quantity:</p><NumericInput mobile min={0} max={100} value={0} style={{ input: { width: '100px' } }} />
                        <br />
                        <RaisedButton label="Add to Cart" />
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