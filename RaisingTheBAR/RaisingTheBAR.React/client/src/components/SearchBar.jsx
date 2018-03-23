import React from 'react';
import SearchBar from 'material-ui-search-bar'

export default class DrawSearchBar extends React.Component {
render() {
  return(
    <SearchBar
      onChange={() => console.log('onChange')}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />
  )
}
}