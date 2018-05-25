import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class CreatingCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryName: '',
      newCategoryParentId: '',
      anchorElCategory: null
    };
  }

  handleNameChange = event => {
    this.setState({ newCategoryName: event.target.value });
  };
  handleSubmit = () => {
    console.log(this.state.newCategoryName)
  }
  handleParentCategoryMenuChoose = (event, index, id) => {
    this.setState({ selectedIndex: index, anchorElCategory: null, newCategoryId: id });
  }
  handleParentCategoryMenuOpen = event => {
    this.setState({ anchorElCategory: event.currentTarget });
  };
  handleParentCategoryMenuClose = () => {
    this.setState({ anchorElCategory: null });
  };
  render() {
    const { anchorElCategory } = this.state;
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
      <form >
        <input
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
              secondary={this.state.selectedIndex === undefined ? "None" : (this.props.categories[this.state.selectedIndex]).name}
            />
          </ListItem>
        </List>
        <Menu
          id="choose-parent"
          anchorEl={anchorElCategory}
          open={Boolean(anchorElCategory)}
          onClose={this.handleParentCategoryMenuClose}
        >
          {this.props.categories.map((option, index) => (
            <MenuItem
              key={option.id}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleParentCategoryMenuChoose(event, index, option.id)}>
              {option.name}
            </MenuItem>
          ))}
        </Menu>

        <Button onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </form>
    );
  }
}
