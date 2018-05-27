import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import ErrorMessage from '../../User/ErrorMessage';

export default class CreatingCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryName: '',
      newCategoryParentId: '',
      anchorElCategoryParent: null,
      responseError: '',
    };
  }
  // componentDidMount() {
  //   this.getSubCategories()
  // }
  // getSubCategories() {
  //   var uri = '/api/Category/GetPossibleChildCategories';
  //   axios.get(uri
  //   ).then(res => {
  //     const possibleSubCategories = res.data;
  //     this.setState({ possibleSubCategories: possibleSubCategories });
  //   }
  //   ).catch(error => {
  //     console.log("error with getting possible subcategories!")
  //     this.setState({ responseError: error.response.request.statusText });
  //   });
  // }
  postNewCategory = () => {
    var createUri = '/api/Category/CreateCategory';
    axios.post(createUri, {
      name: this.state.newCategoryName,
      parentCategoryId: this.state.newCategoryParentId,
    }).catch(error => {
      console.log("error with creating new category!")
      this.setState({ responseError: error.response.data });
    });
    this.forceUpdate()
  }
  handleNameChange = event => {
    this.setState({ newCategoryName: event.target.value });
  };
  handleSubmit = () => {
    console.log(this.state.newCategoryName)
  }
  handleParentCategoryMenuChoose = (event, index, id) => {
    this.setState({ selectedParentIndex: index, anchorElCategoryParent: null, newCategoryParentId: id });
  }
  handleParentCategoryMenuOpen = event => {
    this.setState({ anchorElCategoryParent: event.currentTarget });
  };
  handleParentCategoryMenuClose = () => {
    this.setState({ anchorElCategoryParent: null });
  };
  handleChildCategoryMenuChoose = (event, index, id) => {
    this.setState({ selectedChildIndex: index, anchorElCategoryChild: null, newCategoryChildId: id });
  }
  handleChildCategoryMenuOpen = event => {
    this.setState({ anchorElCategoryChild: event.currentTarget });
  };
  handleChildCategoryMenuClose = () => {
    this.setState({ anchorElCategoryChild: null });
  };
  render() {
    // console.log(this.state.possibleSubCategories)
    // const { anchorElCategoryParent } = this.state;
    // const { anchorElCategoryChild } = this.state;

    // var availableChildren = this.props.categories.map(function (category) {
    //   if (category.children.length) {
    //     return category.children.map(function (child) {
    //       return child
    //     })
    //   }
    // })
    // const availableChildren = (this.props.categories.filter(children => children.length > 0)).filter();
    // console.log(availableChildren)

    return (
      <Paper style={{ width: 400, margin: "auto" }}>
        <ErrorMessage responseError={this.state.responseError} />
        <form >
          <label htmlFor="name">Please enter new category name</label>
          <input
            id="name"
            type="text"
            placeholder="Category name"
            value={this.state.newCategoryName}
            onChange={this.handleNameChange}
            style={{ width: 200, margin: "auto" }}
          />
          <List style={{ width: 200, margin: "auto" }}>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="lock-menu"
              onClick={this.handleParentCategoryMenuOpen}
            >
              <ListItemText
                primary="Choose a parent"
                secondary={this.state.selectedParentIndex === undefined ? "None" : (this.props.categories[this.state.selectedParentIndex]).name}
              />
            </ListItem>
          </List>
          <Menu
            id="choose-parent"
            anchorEl={this.state.anchorElCategoryParent}
            open={Boolean(this.state.anchorElCategoryParent)}
            onClose={this.handleParentCategoryMenuClose}
          >
            {this.props.categories.map((option, index) => (
              <MenuItem
                key={option.id}
                selected={index === this.state.selectedParentIndex}
                onClick={event => this.handleParentCategoryMenuChoose(event, index, option.id)}>
                {option.name}
              </MenuItem>
            ))}
          </Menu>
          <Button onClick={this.postNewCategory} color="primary">
            Submit
        </Button>
        </form>
      </Paper>

    );
  }
}
