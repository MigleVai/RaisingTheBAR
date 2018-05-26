import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import ToPriceDisplay from '../../../functions/ToPriceDisplay';

export default class SubCategories extends React.Component {
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
        Header: "Product amount",
        accessor: "productAmount",
        style: styles.tdStyles,
      }
    ];
    return (
      <div>
        <ReactTable
          data={this.props.subCategories}
          columns={columns}
          defaultPageSize={this.props.subCategories.length}
          showPagination={false}
        />
      </div>
    );
  }
}
