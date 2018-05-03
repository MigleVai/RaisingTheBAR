import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import IconButton from 'material-ui/IconButton';
import AddShopppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import matchSorter from 'match-sorter';
import Breadcrumb from './Breadcrumb';
import ErrorMessage from './ErrorMessage';
import Snackbar from 'material-ui/Snackbar';

export default class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            responseError: '',
            open: false,
        }
        this.getData = this.getData.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    addProduct(addId) {
        if (this.props.islogged === true) {
            axios.post(`api/Cart/AddProductToCart`,
                {
                    Id: addId,
                    Amount: 1
                })
                .then(res => {
                    const result = res.data;
                    this.props.handleAmount(result);
                    console.log(result);
                    // localStorage.setItem('amount', result);
                })
                .catch(error => {
                    this.setState({ responseError: error.response.data });
                });
        } else {
            const product = {
                Id: addId,
                Amount: 1
            }
            var cartOfProducts = [];
            if (localStorage.getItem('cartNotLogged') !== null) {
                cartOfProducts = JSON.parse(localStorage.getItem('cartNotLogged'));
            }
            var item = cartOfProducts.find(function (element) {
                if (element.Id === product.Id.toUpperCase()) {
                    return element;
                }
                return null;
            });
            if (item !== null && item !== undefined) {
                var index = cartOfProducts.indexOf(item);
                cartOfProducts[index].Amount = item.Amount + product.Amount;
            } else {
                cartOfProducts.push(product);
            }
            localStorage.setItem('cartNotLogged', JSON.stringify(cartOfProducts));
            if (item !== null) {
                localStorage.setItem('productAmount', cartOfProducts.length);
                this.props.handleAmount(cartOfProducts.length);
            }
        }
    }
    componentDidMount() {
        this.getData(this.props.match.params.category);
    }

    componentDidUpdate(prevProps) {
        if (prevProps == null) { return null; }
        if (this.props.match.params.category !== prevProps.match.params.category) {
            this.setState({ products: [] });
            this.getData(this.props.match.params.category);
        }
    }

    getData(category) {
        var uri = '/api/Product/GetProductsByCategories';
        if (category === 'all') {
            uri = '/api/Product/GetProducts';
        }
        axios.get(uri, {
            params: {
                categoryName: category
            }
        })
            .then(res => {
                const products = res.data;
                this.setState({ products: products });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        var windowWidth = window.innerWidth;
        var setPadding = 0;
        if (windowWidth > 500) {
            setPadding = windowWidth * 0.1;
        }
        const styles = {
            tdStyles: {
                margin: 'auto',
            },
            imgStyle: {
                width: '20%'
            },
            pageStyle: {
                paddingLeft: setPadding + 'px',
                paddingRight: setPadding + 'px',
            }
        };
        const data = this.state.products;
        const columns = [
            {
                Header: 'Thumbnail',
                Cell: (row) => {
                    return <div><img key={row.original.id} alt="thumb" src={row.original.image} /></div>
                },
                resizable: false,
                sortable: false,
                filterable: false,
                style: styles.imgStyle,
                maxWidth: 100,
            },
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
                Cell: row => {
                    if (row.original.discountedPrice !== null && row.original.discountedPrice !== undefined) {
                        return <div>
                            <s>{row.original.price}</s>
                            <br />
                            {row.original.discountedPrice}
                        </div>
                    } else {
                        return row.original.price;
                    }
                },
                maxWidth: 200,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['price'] }),
                filterAll: true
            },
            {
                Header: "Add to Cart",
                Cell: row => {
                    return <div>
                        <IconButton>
                            <AddShopppingCart />
                        </IconButton>
                        <Snackbar
                            open={this.state.open}
                            message="Added product to cart!"
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </div>
                },
                id: "id",
                sortable: false,
                filterable: false,
                maxWidth: 100,
                resizable: false,
                style: styles.tdStyles
            }
        ];
        return (
            <div style={styles.pageStyle}>
                <Breadcrumb pathname={this.props.location.pathname} />
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
                                if (rowInfo.original !== undefined) {
                                    if (column.id === 'name') {
                                        this.props.history.push(this.props.location.pathname + '/' + rowInfo.original.id);
                                    }
                                    if (column.id === 'id') {
                                        var product = this.state.products.find((item) => item.id === rowInfo.original.id);
                                        this.addProduct(product.id);
                                        this.handleClick();
                                    }
                                }
                            }
                        }
                    }}
                />
            </div>
        )
    }
}