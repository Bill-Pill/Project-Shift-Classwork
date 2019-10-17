import React, { Component } from 'react';
import { onUpdate, forceUpdate, sendEvent } from '../state';

class SearchBar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.props.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;