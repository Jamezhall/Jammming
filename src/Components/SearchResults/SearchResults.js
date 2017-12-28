import React from 'react';
import { TrackList } from '../TrackList/TrackList';
import './SearchResults.css';
import onboardImage from './onboard-image.svg';

export class SearchResults extends React.Component {
  render () {

    let initialResultData;
    if(this.props.searchResults) {
      initialResultData = <div className="onboard-left"><img src={onboardImage} alt="Jammming Onboard" /><p>Let's get Started!</p></div>;
    }
    return (
      <div className="SearchResults">
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd}/>
        {initialResultData}
      </div>
    );
  }
}