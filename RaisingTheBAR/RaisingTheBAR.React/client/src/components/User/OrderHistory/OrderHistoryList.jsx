import React from "react";
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import SingleOrderList from './SingleOrderList';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';
import ErrorMessage from '../ErrorMessage';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Rating from 'react-rating';
import TextField from "material-ui/TextField/TextField";

export default class OrderHistoryList extends React.Component {
    constructor() {
        super();
        this.state = {
            responseError: '',
            orders: [],
            open: false,
            rating: 1,
            comment: '',
            orderId: '',
            button: false
        };
        this.getData = this.getData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    getData() {
        axios.get(`/api/Order/GetAllOrders`)
            .then(res => {
                const gotOrders = res.data;
                this.setState({ orders: gotOrders });
            })
            .catch(function (error) {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        if (this.props.logged) {
            this.getData();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.orderId !== nextState.orderId && nextState.orderId !== '' && this.state.orderId === '') {
            return true;
        }
        if (this.props.logged !== nextProps.logged) {
            return true;
        }
        if (this.state.orders.length !== nextState.orders.length) {
            return true;
        }
        if (nextState.open === true) {
            return true;
        }
        if (this.state.open === true && nextState.open === false) {
            return true;
        }
        if (this.state.button === true && nextState.button === false) {
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.logged !== prevProps.logged) {
            this.getData();
        }
        if (this.state.orders.length !== prevState.orders.length) {
            this.getData();
        }
        if (this.state.open === false && prevState.open === true) {
            this.setState({ button: false, orders: [] });
        }
        if (this.state.button === false && prevState.button === true) {
            this.getData();
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        axios.post(`/api/Order/RateOrder`, {
            OrderId: this.state.orderId,
            Rating: this.state.rating,
            Comment: this.state.comment
        })
            .then(res => {
                this.setState({ open: false, orderId: '', rating: 1, comment: '', button: true });
            })
            .catch((error) => {
                if (error !== undefined) {
                    this.setState({ responseError: error.response.statusText });
                }
            });
    };
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
            },
            tdStyles: {
                margin: 'auto',
            }
        };
        const columnsOrders = [
            {
                Header: "Order Date",
                accessor: "startedDate",
                style: styles.tdStyles,
                Cell: row => {
                    var dateParts = row.original.startedDate.split(/T|Z/);
                    return dateParts[0];
                }
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
                Cell: row => {
                    if (row.original.orderState === 'Completed' && row.original.isRated === false) {
                        return <div><RaisedButton label="Rate" /></div>
                    } else {
                        return <span>{row.original.orderState}</span>
                    }
                },
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
                <ErrorMessage responseError={this.state.responseError} />
                <ReactTable
                    data={dataOrders}
                    columns={columnsOrders}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                if (column.id === 'orderState' && rowInfo !== undefined && rowInfo.original.isRated === false) {
                                    this.setState({ orderId: rowInfo.original.orderId });
                                    this.handleOpen();
                                }
                                if (handleOriginal) {
                                    handleOriginal();
                                }
                            }
                        }
                    }}
                    SubComponent={row => {
                        return (
                            <div>
                                <SingleOrderList orderId={row.original.orderId} amount={row.original.productAmount} />
                            </div>
                        );
                    }}
                />
                <div>
                    <Dialog
                        title="Notification"
                        actions={<RaisedButton
                            label="Submit"
                            primary={true}
                            onClick={this.handleClose}
                        />}
                        modal={false}
                        open={this.state.open}>
                        Please rate the order.
                        <br />
                        <Rating
                            initialRating={this.state.rating}
                            emptySymbol={<i className="material-icons">star_border</i>}
                            fullSymbol={<i className="material-icons">star</i>}
                            onChange={(rate) => {
                                this.setState({ rating: rate })
                            }}
                        />
                        <br />
                        <TextField
                            floatingLabelText="Comment"
                            hintText="Optional..."
                            value={this.state.comment}
                            onChange={(event) => this.setState({ comment: event.target.value })}
                        />
                    </Dialog>
                </div>
            </div>
        );
    }
}
