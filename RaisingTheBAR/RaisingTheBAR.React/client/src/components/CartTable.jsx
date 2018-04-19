import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import ErrorMessage from './ErrorMessage';

export default class CartTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
        this.getData = this.getData.bind(this);
    }

    getData() {
        axios.get(`/api/Cart/GetCart`)
            .then(res => {
                const cart = res.data;
                this.setState({ cart });
            })
            .catch(error => {
                this.setState({ responseError: error.response.data });
            });
    }
    componentDidMount() {
        this.getData();
    }
    componentDidUpdate(){
        this.getData();
    }
    render() {
        const styles = {
            tdStyles: {
                margin: 'auto',
            },
            imgStyle: {
                width: '20%'
            },
            tableStyle:{
                width: '50%',
                display: 'block',
                position: 'absolute'
            }
        };
        const data = this.state.cart.products;
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
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['amount'] }),
                filterAll: true
            }
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
                />
            </div>
        )
    }
}