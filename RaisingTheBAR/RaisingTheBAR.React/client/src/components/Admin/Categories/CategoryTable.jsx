import React from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import ErrorMessage from '../../User/ErrorMessage';
import SubCategories from './SubCategories'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';


export default class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseError: '',
      categories: this.props.categories,
      openAddFormDialog: false
    }
  }
  componentWillUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ categories: nextProps.categories })
    }

  }
  handleAddFormDialogOpen = () => {
    this.setState({ openAddFormDialog: true });
  };

  handleAddFormDialogClose = () => {
    this.setState({ openAddFormDialog: false });
  };
  handleDeleteCategory = (category) => {
    console.log(category)
    // this.postCategoryRemove(category.id)
  }
  postCategoryRemove = (categoryId) => {
    var removeUri = '/api/Category/RemoveCategory';
    axios.post(removeUri, {
      categoryId: categoryId,
    }).catch(error => {
      console.log("error with removing a category!")
      console.log(error)
    });
    this.forceUpdate()
  }
  render() {
    const styles = {
      tdStyles: {
        margin: 'auto',
      }
    };
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: row => { return row.original.name ? row.original.name : "Undefined" },
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Subcategory amount',
        accessor: 'children.length',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }, {
        Header: 'Product amount',
        accessor: 'productAmount',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }, {
        Header: 'Delete category',
        Cell: row =>
          <div>
            {
              <Button style={{ backgroundColor: "#FF0000" }} onClick={() => this.handleDeleteCategory(row.original)}>
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
        < ReactTable
          data={this.state.categories}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
          style={{ display: 'contents' }}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          SubComponent={
            row => {
              if (row.original.children.length) {
                return <SubCategories
                  onDeleteCategory={this.handleDeleteCategory.bind(this)}
                  subCategories={row.original.children} />
              }
              else {
                return null
              }
            }
          }

        />
      </div>
    )
  }
}