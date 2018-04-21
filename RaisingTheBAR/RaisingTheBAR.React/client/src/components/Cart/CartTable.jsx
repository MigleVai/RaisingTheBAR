import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

export default class CartTable extends React.Component {
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
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['amount'] }),
                filterAll: true
            }
        ];

        return (
            <div style={styles.tableStyle}>
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