import React from 'react';
import ReactTable from 'react-table';
import CategoryProducts from './CategoryProducts'
import AddProduct from './AddProduct'

export default class EditCategoryProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: this.props.categories,
      allCategories: [],
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ categories: nextProps.categories })
    }
  }
  render() {
    const styles = {
      tdStyles: {
        margin: 'auto',
      }
    };
    var hasChildren = this.props.categories.filter((category) => {
      return category.children.length > 0;
    });
    var children = []
    for (var category of hasChildren) {
      for (var subCategory of category.children) {
        children.push(subCategory)
      }
    }
    var allCategories = this.props.categories.concat(children)
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: row => { return row.original.name ? row.original.name : "Undefined" },
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Product amount',
        accessor: 'productAmount',
        style: styles.tdStyles,
        maxWidth: 150,
        resizable: false,
        filterable: false
      }, {
        Header: 'Add a product',
        Cell: row => {
          return <div>
            <AddProduct refresh={this.props.refresh.bind(this)} category={row.original} />
          </div>
        },
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }
    ];
    return (
      <div>
        < ReactTable
          data={allCategories}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          SubComponent={
            row => {
              return (
                <div>
                  <CategoryProducts refresh={this.props.refresh.bind(this)} category={row.original} />
                </div>
              )
            }
          }
        />
      </div>
    )
  }
}