import React from "react";
import axios from 'axios';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ToPriceDisplay from '../User/functions/ToPriceDisplay';

export default class OrderProductList extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  render() {
    const styles = {
      imgStyle: {
        width: '80px',
        height: '50px',
        margin: 'auto'
      },
      tdStyles: {
        margin: 'auto',
      }
    };
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        style: styles.tdStyles,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: row => {
          return ToPriceDisplay(row.original.price);
        },
        style: styles.tdStyles,
      },
      {
        Header: "Amount",
        accessor: "amount",
        style: styles.tdStyles,
      },
    ];
    return (
      <div>
        <ReactTable
          data={this.props.order.products}
          columns={columns}
          defaultPageSize={this.props.order.products.length}
          showPagination={false}
        />
      </div>
    );
  }
}
