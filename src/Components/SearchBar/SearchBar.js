import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "Search Term"
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term)
  } 
  
  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  // BONUS - Had to add this. Killing me pressing a button every time!
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleKeyPress}/>
        <a onClick={this.search}>
          <FontAwesomeIcon icon="search"/>
        </a>
      </div>
    );
  }           
}