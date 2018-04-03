import React from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';


export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        product: {}
    }
    componentDidMount() {
        console.log(this.props);
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
       // console.log(this.state.product);
        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
                <div>

                </div>
                <div>

                </div>
            </div>
        )
    }
}