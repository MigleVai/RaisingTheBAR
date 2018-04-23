import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import FlatButton from 'material-ui/FlatButton';

export default class CartTable extends React.Component {
    constructor() {
        super();
        this.state = {
            responseError: ''
        }
        this.renderEditable = this.renderEditable.bind(this);
        this.sendAmount = this.sendAmount.bind(this);
    }
    sendAmount(productID, amount) {
        if (this.props.islogged === true) {
            axios.post(`api/Cart/EditProduct`,
                {
                    Id: productID,
                    Amount: amount
                })
                .then(res => {
                    const result = res.data;
                    if (amount <= 0) {
                        var am = localStorage.getItem('amount');
                        am = am - 1;
                        localStorage.setItem('amount', am);
                    }
                })
                .catch(error => {
                    this.setState({ responseError: error.response.data });
                });
        } else {
            const product = {
                Id: productID,
                Amount: amount
            }
            var cartOfProducts = [];
            if (localStorage.getItem('cartNotLogged') !== null) {
                cartOfProducts = JSON.parse(localStorage.getItem('cartNotLogged'));
            }
            var item = cartOfProducts.find(function (element) {
                if (element.Id === productID.toUpperCase()) {
                    return element;
                }
                return null;
            });
            if (item !== null && item !== undefined) {
                var index = cartOfProducts.indexOf(item);
                if (amount <= 0) {
                    cartOfProducts.splice(index, 1);
                    localStorage.setItem('productAmount', cartOfProducts.length);
                } else {
                    cartOfProducts[index].Amount = amount;
                }
            }
            localStorage.setItem('cartNotLogged', JSON.stringify(cartOfProducts));
        }
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.props.cart];
                    console.log(e.target.innerHTML);
                    if (Number(e.target.innerHTML) > 0) {
                        console.log(e.target.innerHTML == 0);
                        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                        this.sendAmount(cellInfo.row._original.productId, e.target.innerHTML);
                    } else {
                        console.log('not valid');
                        this.setState({ responseError: 'Not valid amount' });
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.cart[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }
    render() {
        const styles = {
            tableStyle: {
                width: '70%',
                display: 'inline-block',
                position: 'relative',
                paddingLeft: '5%',
                float: 'left'
            },
            tdStyles: {
                margin: 'auto',
            },
        };
        const data = this.props.cart;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                style: styles.tdStyles,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['name'] }),
                filterAll: true,
            }, {
                Header: 'Price',
                accessor: 'price',
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['price'] }),
                filterAll: true
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                style: styles.tdStyles,
                maxWidth: 200,
                Cell: this.renderEditable,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['amount'] }),
                filterAll: true
            },
            {
                Header: 'Remove',
                id: "id",
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterable: false,
                Cell: row => {
                    return <div><FlatButton label="Remove" /></div>
                },
            },
        ];

        return (
            <div style={styles.tableStyle}>
                <ErrorMessage responseError={this.state.responseError} />
                < ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    style={{ display: 'contents' }}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                if (column.id === 'id') {
                                    console.log(rowInfo.original.productId);
                                    this.sendAmount(rowInfo.original.productId, 0);
                                }
                            }
                        }
                    }
                    }
                />
            </div>
        )
    }
}