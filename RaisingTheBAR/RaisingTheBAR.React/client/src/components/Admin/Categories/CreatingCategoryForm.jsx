import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

export default class CreatingCategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategoryName: '',
      newCategoryParentId: '',
      anchorElCategoryParent: null,
    };
  }
  onSubmit = () => {
    this.props.onAddCategoryEvent(this.state.newCategoryName, this.state.newCategoryParentId)
    this.setState({newCategoryName: '', newCategoryParentId: '', selectedParentIndex: undefined})
  }
  handleNameChange = event => {
    this.setState({ newCategoryName: event.target.value });
  };
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
    return (
      <Paper style={{ width: 400, margin: "auto" }}>
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
          <hr/>
          <label htmlFor="parent">Don't select if you want it to be a parent category</label>
          <List style={{ width: 200, margin: "auto" }} id="parent">
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
          <Button onClick={this.onSubmit} color="primary">
            Submit
        </Button>
        </form>
      </Paper>

    );
  }
}
