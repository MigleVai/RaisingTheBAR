import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import axios from 'axios';
import ErrorMessage from '../../ErrorMessage';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import ToPriceDisplay from '../../functions/ToPriceDisplay';

export default class CartTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            responseError: '',
            delete: false,
            products: []
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
                    this.props.handleAmount(res.data.products.length);
                    this.setState({ products: res.data.products });
                    if (amount <= 0) {
                        var am = localStorage.getItem('amount');
                        am = am - 1;
                        localStorage.setItem('amount', am);
                    }
                    this.props.mustUpdate();
                })
                .catch(error => {
                    this.setState({ responseError: error.response.data });
                });
        } else {
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
                    var tempArray = this.state.products;
                    var removableItem = tempArray.find(function (element) {
                        if (element.productId === productID) {
                            return element;
                        }
                        return null;
                    });
                    var removeIndex = tempArray.indexOf(removableItem);
                    tempArray.splice(removeIndex, 1);
                    this.setState({ products: tempArray });
                    this.props.handleAmount(tempArray.length);
                } else {
                    cartOfProducts[index].Amount = amount;
                }
            }
            this.props.mustUpdate();
            localStorage.setItem('cartNotLogged', JSON.stringify(cartOfProducts));
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.cart.length !== this.props.cart.length) { //Number(amount) !== this.state.products.length && 
            this.setState({ products: nextProps.cart });
            this.props.update();
            return true;
        }
        if(nextState.responseError !== ''){
            this.props.update();
            this.setState({responseError: ''});
            return true;
        }
        return false;
    }
    renderEditable(cellInfo) {
        return (
            <Paper zDepth={1}><div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    if (Number(e.target.innerHTML) !== cellInfo.row._original.amount) {
                        const data = [...this.props.cart];
                        if (Number(e.target.innerHTML) > 0) {
                            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                            this.sendAmount(cellInfo.row._original.productId, e.target.innerHTML);
                        } else {
                            e.target.innerHTML = cellInfo.row._original.amount;
                            this.setState({ responseError: 'Not valid amount' });
                        }
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: this.props.cart[cellInfo.index][cellInfo.column.id]
                }}
            /></Paper>
        );
    }
    render() {
        var paddingLeftTable = '5%';
        var widthTable = '70%';
        if (this.props.mobile === true) {
            paddingLeftTable = 'none';
            widthTable = '100%';
        }
        const styles = {
            tableStyle: {
                width: widthTable,
                display: 'inline-block',
                position: 'relative',
                paddingLeft: paddingLeftTable,
                float: 'left'
            },
            tdStyles: {
                margin: 'auto',
            },
        };
        // var data = this.props.cart;
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                style: styles.tdStyles,
                resizable: false,
                filterable: false
            }, {
                Header: 'Price',
                accessor: 'price',
                style: styles.tdStyles,
                Cell: row => {
                    if (row.original.discountedPrice !== 0) {
                        return <span>{ToPriceDisplay(row.original.discountedPrice)}</span>;
                    } else {
                        return <span>{ToPriceDisplay(row.original.price)}</span>;
                    }
                },
                maxWidth: 200,
                resizable: false,
                filterable: false
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                style: styles.tdStyles,
                maxWidth: 200,
                Cell: this.renderEditable,
                resizable: false,
                filterable: false
            },
            {
                Header: 'Remove',
                id: "id",
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterable: false,
                sortable: false,
                Cell: row => {
                    return <div><FlatButton label="Remove" /></div>
                },
            },
        ];
        return (
            <div style={styles.tableStyle}>
                <ErrorMessage responseError={this.state.responseError} />
                < ReactTable
                    data={this.props.cart}
                    columns={columns}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    style={{ display: 'contents' }}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: (e, handleOriginal) => {
                                if (column.id === 'id' && rowInfo !== undefined) {
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