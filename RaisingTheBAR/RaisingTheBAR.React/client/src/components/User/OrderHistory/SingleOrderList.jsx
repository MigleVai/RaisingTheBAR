import React from "react";
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ToPriceDisplay from '../../../functions/ToPriceDisplay';

export default class SingleOrderList extends React.Component {
    constructor() {
        super();
        this.state = {
            singleOrder: []
        };
    }
    componentDidMount() {
        axios.get(`/api/Order/GetSingleOrder`, {
            params: {
                OrderId: this.props.orderId
            }
        })
            .then(res => {
                const products = res.data.products;
                this.setState({ singleOrder: products })
            })
            .catch(function (error) {
                // show error
            });
    }
    render() {
        const styles = {
            imgStyle: {
                width: '80px',
                height: '50px',
                margin: 'auto'
            },
            tdStyles: {
                margin: 'auto',
            }
        };
        const columnsSingle = [
            {
                Header: "Image",
                accessor: "image",
                Cell: (row) => {
                    return <div><img style={styles.imgStyle} key={row.original.orderId} alt="thumb" src={row.original.image} /></div>
                },
            },
            {
                Header: "Name",
                accessor: "name",
                style: styles.tdStyles,
            },
            {
                Header: "Price",
                accessor: "price",
                Cell: row => {
                    return ToPriceDisplay(row.original.price);
                },
                style: styles.tdStyles,
            },
            {
                Header: "Amount",
                accessor: "amount",
                style: styles.tdStyles,
            },
        ];
        const dataSingle = this.state.singleOrder;
        return (
            <div>
                <ReactTable
                    data={dataSingle}
                    columns={columnsSingle}
                    defaultPageSize={this.props.amount}
                    showPagination={false}
                />
            </div>
        );
    }
}
