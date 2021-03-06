import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import OrderProductList from './OrderProductList'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import update from 'immutability-helper';
import ToPriceDisplay from '../../../functions/ToPriceDisplay';
import ToDateDisplay from '../../../functions/ToDateDisplay';
import ErrorMessage from '../../User/ErrorMessage';

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      responseError: ''
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    var uri = '/api/Administrator/GetOrders';
    axios.get(uri
    ).then(res => {
      const orders = res.data;
      this.setState({ orders: orders });
    }).catch(error => {
      this.setState({ responseError: error.response.data });
    });
  }
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  handleOrderStateChange = (order, event, index, value) => {
    var indexOfOrder = this.state.orders.indexOf(order)
    this.setState({
      orders: update(this.state.orders, {
        [indexOfOrder]: {
          orderState: { $set: value },
        }
      })
    })
    this.postOrderStateChange(value, order.orderId)
    this.sleep(500).then(() => {
      this.getData()
    })
  }
  postOrderStateChange = (orderState, id) => {
    var statusChangeUri = '/api/Order/EditOrder'
    axios.post(statusChangeUri, {
      orderId: id,
      orderState: orderState
    }).catch(error => {
      this.setState({ responseError: error.response.data });
    })
  }
  render() {
    const styles = {
      tdStyles: {
        margin: 'auto',
      }
    };
    const columns = [
      {
        Header: 'Email',
        accessor: 'orderEmail',
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Started',
        accessor: 'startedDate',
        Cell: row => {
          return ToDateDisplay(row.original.startedDate)
        },
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Last updated',
        accessor: 'lastUpdateDate',
        style: styles.tdStyles,
        Cell: row => {
          return row.original.lastUpdateDate ? ToDateDisplay(row.original.lastUpdateDate) : ""
        },
        resizable: false,
        filterable: false
      }, {
        Header: 'Total price',
        accessor: 'totalPrice',
        style: styles.tdStyles,
        Cell: row => {
          return ToPriceDisplay(row.original.totalPrice);
        },
        filterable: false,
        maxWidth: 200,
        resizable: false
      }, {
        Header: 'Change order state',
        accessor: 'orderState',
        Cell: row => {
          return (
            <DropDownMenu value={row.original.orderState} onChange={this.handleOrderStateChange.bind(this, row.original)}>
              <MenuItem value={"Ordered"} primaryText="Ordered" />
              <MenuItem value={"Approved"} primaryText="Approved" />
              <MenuItem value={"Rejected"} primaryText="Rejected" />
              <MenuItem value={"InAssembly"} primaryText="InAssembly" />
              <MenuItem value={"Shipped"} primaryText="Shipped" />
              <MenuItem value={"Completed"} primaryText="Completed" />
            </DropDownMenu>
          )
        },
        style: styles.tdStyles,
        filterable: false,
        resizable: false
      }
    ];
    return (
      <div>
        <ErrorMessage responseError={this.state.responseError} />
        < ReactTable
          data={this.state.orders}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          defaultSorted={[
            {
              id: "startedDate",
              desc: true
            }
          ]}
          SubComponent={row => {
            return (
              <div>
                <OrderProductList order={row.original} />
              </div>
            )
          }}
        />
      </div>
    )
  }
}
