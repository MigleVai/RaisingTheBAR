import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import { CheckBox as CheckBoxIcon } from 'material-ui/svg-icons/toggle/check-box';
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import IconButton from 'material-ui/IconButton';

import Checkbox from 'material-ui/Checkbox';


export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    userEmail: 'kazkoks@gmail.com',
                    orderCount: 11,
                    totalValueOfOrders: 3440,
                    averageValueOfOrders: 51,
                    blocked: 'true'
                },
                {
                    userEmail: 'ciuvaks@gmail.com',
                    orderCount: 4,
                    totalValueOfOrders: 999,
                    averageValueOfOrders: 444,
                    blocked: 'false'
                },
                {
                    userEmail: 'blaah@gmail.com',
                    orderCount: 1,
                    totalValueOfOrders: 100,
                    averageValueOfOrders: 100,
                    blocked: 'false'
                }
            ]
        }
    }

    render() {
        const styles = {
            tdStyles: {
                margin: 'auto',
            }
        };

        const columns = [
            {
                Header: 'User email',
                accessor: 'userEmail',
                style: styles.tdStyles,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['userEmail'] }),
                filterAll: true
            },
            {
                Header: 'Total number of orders',
                accessor: 'orderCount',
                style: styles.tdStyles,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['orderCount'] }),
                filterAll: true,
            }, {
                Header: 'Total value of orders',
                accessor: 'totalValueOfOrders',
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['totalValueOfOrders'] }),
                filterAll: true
            }, {
                Header: 'Average value of orders',
                accessor: 'averageValueOfOrders',
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['averageValueOfOrders'] }),
                filterAll: true
            }, {
                Header: 'Blocked',
                accessor: 'blocked',
                style: styles.tdStyles,
                maxWidth: 200,
                resizable: false,
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ['blocked'] }),
                filterAll: true
            }

        ];

        return (
            <div>
                < ReactTable
                    data={this.state.users}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    style={{ display: 'contents' }}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    SubComponent={row => {
                        return (
                            <h1>future implementation of order history + block button</h1>
                        )
                    }}
                />
            </div>
        )
    }
}