import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import "react-table/react-table.css";
import IconButton from 'material-ui/IconButton';
import AddShopppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import matchSorter from 'match-sorter';
import Breadcrumb from './Breadcrumb';

export default class ItemPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }
    
    componentDidMount() {
        axios.get(`/api/Product/GetAllProducts`)
            .then(res => {
                const products = res.data;
                this.setState({ products });
            })
            .catch(function (error) {
                // show error
            });
    }

    render() {
        const styles = {
            tdStyles: {
                margin: 'auto',
            },
        };
        const data = this.state.products;

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
                Header: "Status",
                Cell: row => {
                    return <div><IconButton><AddShopppingCart /></IconButton></div>
                },
                id: "id",
                sortable: false,
                filterable: false,
                maxWidth: 100,
                resizable: false
            }
        ];

        return (
            <div>
                <Breadcrumb pathname={this.props.location.pathname} />
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
                                if (column.id === 'name') {
                                    this.props.history.push(this.props.location.pathname + '/' + rowInfo.original.id);
                                }
                            }
                        }
                    }}
                />
            </div>
        )
    }
}