import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import ErrorMessage from '../../User/ErrorMessage';
import SubCategories from './SubCategories'
import AddRemoveProduct from './AddRemoveProduct'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class EditCategoryProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: '',
      categories: this.props.categories,
      openAddFormDialog: false,
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
    var subCategories = this.props.categories.filter

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

    // var unique = children.filter((v, i, a) => a.indexOf(v) === i)
    // console.log(unique)

    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: row => { return row.original.name ? row.original.name : "Undefined" },
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Product amount',
        accessor: 'productAmount',
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
                  <AddRemoveProduct category={row.original} />
                </div>
              )
            }
          }
        />
      </div>
    )
  }
}