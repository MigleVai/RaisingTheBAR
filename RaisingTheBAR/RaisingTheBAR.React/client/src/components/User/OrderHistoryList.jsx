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
        this.handleSingleOrder = this.handleSingleOrder.bind();
    }
    componentDidMount() {
        axios.get(`/api/Order/GetAllOrders`)
            .then(res => {
                const gotOrders = res.data;
                console.log(gotOrders);
                this.setState({ orders: gotOrders });
            })
            .catch(function (error) {
                // show error
            });
    }
    handleSingleOrder(id) {
        axios.get(`/api/Order/GetSingleOrder`, {
            params: {
                OrderId: id
            }
        })
            .then(res => {
                console.log(res.data);
                this.setState({singleOrder: res.data})
                console.log(this.state.singleOrder);
            })
            .catch(function (error) {
                // show error
            });
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
                accessor: "startedDate"
            },
            {
                Header: "Amount",
                accessor: "productAmount"
            },
            {
                Header: "Total Cost",
                accessor: "orderPrice"
            },
            {
                Header: "Status",
                accessor: "orderState",
            },
            {
                Header: "Id",
                accessor: "orderId",
                show: false
            }
        ];
        const columnsSingle = [
            {
                Header: "Image",
                accessor: "image",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Price",
                accessor: "price",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Amount",
                accessor: "amount",
            },
        ];
        const dataOrders = this.state.orders;
        console.log(this.state.orders);
        return (
            <div style={styles.pageStyle}>
                <ReactTable
                    data={dataOrders}
                    columns={columnsOrders}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        this.handleSingleOrder(row.original.orderId);
                        const dataSingle = this.state.singleOrder.products;
                        console.log(dataSingle);
                        return (
                            <div style={{ padding: "20px" }}>
                                <br />
                                <ReactTable
                                    data={dataSingle}
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
