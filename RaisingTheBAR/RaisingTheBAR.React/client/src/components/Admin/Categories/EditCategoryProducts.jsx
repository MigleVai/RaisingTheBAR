import React from 'react';
import ReactTable from 'react-table';
import ErrorMessage from '../../User/ErrorMessage';
import CategoryProducts from './CategoryProducts'
import AddProduct from './AddProduct'

export default class EditCategoryProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: '',
      categories: this.props.categories,
      allCategories: [],
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ categories: nextProps.categories })
    }
  }
  handleRemoveProduct = (category) => {
    console.log(category)
  }
  handleAddProduct = (category) => {
    console.log(category)
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
        maxWidth: 400,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Product amount',
        accessor: 'productAmount',
        style: styles.tdStyles,
        maxWidth: 200,
        resizable: false,
        filterable: false
      }, {
        Header: 'Add a product',
        Cell: row => {
          return <div>
            <AddProduct category={row.original} />
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
                  <CategoryProducts category={row.original} />
                </div>
              )
            }
          }
        />
      </div>
    )
  }
}