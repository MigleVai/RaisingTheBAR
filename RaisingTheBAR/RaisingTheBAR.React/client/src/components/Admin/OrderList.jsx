import React from 'react';
import ReactTable from 'react-table';

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const columns = [{
      Header: 'Amount',
      accessor: 'amount'
    }, {
      Header: 'Total price',
      accessor: 'totalPrice',
    }, {
      Header: 'Order date',
      accessor: 'orderDate' //gal cia custom accesor inkalt
    }, {
      Header: 'Order state',
      accessor: 'orderState'
    }]

    return (
      <div>
        <table style={{ width: 100 + "%" }} className="table table-bordered">
          <thead>
            <tr>
              <th >Amount</th>
              <th style={{ width: 7 + "%" }}>Total price</th>
              <th style={{ width: 7 + "%" }}>Order date</th>
              <th style={{ width: 20 + "%" }}>Order state</th>
              <th style={{ width: 4 + "%" }} >?Change status?</th>
            </tr>
          </thead>

          <tbody>
            <tr className="eachRow">
              <td value={this.props.row.amount} />
              <td value={this.props.row.totalPrice} />
              <td value={this.props.row.orderDate} />
              <td value={this.props.row.orderState} />
            </tr>
          </tbody>

        </table>
      </div>
    )
  }
}
