import React from "react";
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SingleOrderList from './SingleOrderList';
import ToPriceDisplay from '../functions/ToPriceDisplay';

export default class OrderHistoryList extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: []
        };
        this.getData = this.getData.bind(this);
    }
    getData(){
        axios.get(`/api/Order/GetAllOrders`)
            .then(res => {
                const gotOrders = res.data;
                this.setState({ orders: gotOrders });
            })
            .catch(function (error) {
                //show error
            });
    }
    componentDidMount() {
        if(this.props.logged)
        {
            this.getData();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.logged !== prevProps.logged)
        {
            this.getData();
        }
        if (this.state.orders.length !== prevState.orders.length) {
            this.getData();
        }
    }
    render() {
        var windowWidth = window.innerWidth;
        var setPadding = 0;
        if (windowWidth > 500) {
            setPadding = windowWidth * 0.1;
        }
        const styles = {
            pageStyle: {
                paddingLeft: setPadding + 'px',
                paddingRight: setPadding + 'px',
            }
        };
        const columnsOrders = [
            {
                Header: "Order Date",
                accessor: "startedDate",
                style: styles.tdStyles,
            },
            {
                Header: "Amount",
                accessor: "productAmount",
                style: styles.tdStyles,
            },
            {
                Header: "Total Cost",
                accessor: "orderPrice",
                Cell: row => {
                    return ToPriceDisplay(row.original.orderPrice);
                },
                style: styles.tdStyles,
            },
            {
                Header: "Status",
                accessor: "orderState",
                style: styles.tdStyles,
            },
            {
                Header: "Id",
                accessor: "orderId",
                show: false,
                style: styles.tdStyles,
            }
        ];
        const dataOrders = this.state.orders;
        return (
            <div style={styles.pageStyle}>
                <ReactTable
                    data={dataOrders}
                    columns={columnsOrders}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return (
                            <div>
                                <SingleOrderList orderId={row.original.orderId} amount={row.original.productAmount} />
                            </div>
                        );
                    }}
                />
                <br />
            </div>
        );
    }
}
