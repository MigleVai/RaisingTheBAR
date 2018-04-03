import React from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';


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
        const styles = {
            h3Style: {
                display: 'inline-block',
                textAlign: 'left',
                width: '100%',
                paddingLeft: '10%'
            },
            imgdivStyle: {
                minWidth: '35%',
                maxWidth: '35%'
            },
            imgStyle:{
                marginLeft: '15%',
                marginTop: '3%',
                marginRight: '3%',
                float: 'left',
                maxWidth: '100%'
            },
            textStyle: {
                marginTop: '3%',
                textAlign: 'left',
                display: 'flow-root'
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
                <div style={styles.imgdivStyle}><img style={styles.imgStyle} key={this.state.product.id} alt="No Image" src={(this.state.product.image)} /></div>
                <div>
                    <div style={styles.textStyle}>
                        <p>Description:</p>
                        <p style={{paddingLeft: '3%'}}>{this.state.product.description}</p>
                        <p>Cost:  {price}€</p>
                    </div>
                </div>
            </div>
        )
    }
}