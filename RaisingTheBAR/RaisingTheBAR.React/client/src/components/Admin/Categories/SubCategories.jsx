import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';

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
        Cell: row => { return row.original.name ? row.original.name : "Undefined" },
        style: styles.tdStyles,
      },
      {
        Header: "Product amount",
        accessor: "productAmount",
        style: styles.tdStyles,
      }, {
        Header: 'Delete subcategory',
        Cell: row =>
          <div>
            {
              <Button style={{ backgroundColor: "#FF0000" }} onClick={() => this.props.onDeleteCategory(row.original)}>
                Delete
              </Button>
            }
          </div>,
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      },
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
