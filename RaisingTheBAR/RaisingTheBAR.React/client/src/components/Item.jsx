import React from 'react';
import Breadcrumb from './Breadcrumb';
import axios from 'axios';


export default class Item extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        axios.get(`/api/Product/GetAllProducts`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(function (error) {
                // show error
            });
    }

    render() {
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