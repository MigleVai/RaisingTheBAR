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
  handleCategoryNameChange = event => {
    // // this.setState({
    // //   [name]: event.target.value,
    // // });
    // var newCategory = event.target.value
    // var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);

    // var newCategory = {
    //   id: id,
    //   name: event.target.value,
    //   children: [],
    //   productAmount: 0,
    //   isAdded : true
    // }
    // console.log(this.state.categories)
    // this.state.categories.push(category);
    // this.setState({categories: this.state.categories});

  };
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
        style: styles.tdStyles,
        resizable: false,
        filterable: false,
      }, {
        Header: 'Containing subcategories',
        accessor: 'children.length',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }, {
        Header: 'Amount of products',
        accessor: 'productAmount',
        style: styles.tdStyles,
        resizable: false,
        filterable: false
      }
    ];
    return (
      <div>
        {/* <Dialog
          open={this.state.openAddFormDialog}
          onClose={this.handleAddFormDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Adding category</DialogTitle>
          <DialogContent>
            <CreatingCategoryForm/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAddFormDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddFormDialogClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog> */}
        {/* <button style={{ width: 100 + 'px', }} type="button" onClick={this.handleAddFormDialogOpen} className="btn btn-success pull-right">Add category</button> */}
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
                return <SubCategories subCategories={row.original.children} />
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