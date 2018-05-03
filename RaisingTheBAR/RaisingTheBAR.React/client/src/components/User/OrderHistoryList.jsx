import React from "react";
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class OrderHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            singleOrder: {}
        };
        this.handleAllOrders = this.handleAllOrders.bind();
        this.handleSingleOrder = this.handleSingleOrder.bind();
    }
    handleAllOrders(props) {
        axios.get(`/api/Order/GetAllOrders`)
            .then(res => {
                this.setState({ orders: res.data });
            })
            .catch(function (error) {
                // show error
            });
    }
    handleSingleOrder(props) {
        axios.get(`/api/Order/GetSingleOrder`, {
            OrderId: this.state.firstname
        })
            .then(res => {
            })
            .catch(function (error) {
                // show error
            });
    }
    render() {
        const columnsOrders = [
            {
                Header: "Order Date",
                accessor: "date"
            },
            {
                Header: "Amount",
                accessor: "amount"
            },
            {
                Header: "Total Cost",
                accessor: "cost"
            },
            {
                Header: "Status",
                accessor: "status",
            }
        ];
        const columnsSingle = [

        ];
        const { data } = this.state.orders;
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columnsOrders}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return (
                            <div style={{ padding: "20px" }}>
                                <br />
                                <ReactTable
                                    data={data}
                                    columns={columnsSingle}
                                    defaultPageSize={3}
                                    showPagination={false}
                                />
                            </div>
                        );
                    }}
                />
                <br />
            </div>
        );
    }
}
