import React from 'react';

export default class ProductSearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div style={{ margin: 7 }}>
        <input style={{ width: 300 }} type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)} />
      </div>
    );
  }
}