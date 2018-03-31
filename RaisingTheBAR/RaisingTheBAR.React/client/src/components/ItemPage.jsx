import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import IconButton from 'material-ui/IconButton';
import AddShopppingCart from 'material-ui/svg-icons/action/add-shopping-cart';

export default class ItemPage extends React.Component {
    state = {
        products: []
    }
    componentDidMount() {
        axios.get(`/api/Product/GetAllProducts`)
            .then(res => {
                const products = res.data;
                console.log(products);
                this.setState({ products });
            })
            .catch(function (error) {
                // show error
            });
    }

    render() {
        const styles = {
            tdStyles:{
                margin: 'auto',
            }
        };
        const data = this.state.products;

        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                style: styles.tdStyles
            }, {
                Header: 'Price',
                accessor: 'price',
                style: styles.tdStyles,
                maxWidth: 200
            },
            {
                Header: "Status",
                Cell: row => {
                    return <div><IconButton><AddShopppingCart /></IconButton></div>
                },
                id: "id",
                sortable: false,
                maxWidth: 100
            }
        ];

        return (
            < ReactTable
                data={data}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
            />
        )
    }
}