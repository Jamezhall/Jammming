import React from 'react';
import { TrackList } from '../TrackList/TrackList';
import './Playlist.css';
import placeholder from './playlist-placeholder.svg';

export class Playlist extends React.Component { 
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render () {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/> 
        <TrackList isRemoval={this.props.isRemoval} tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>      
        <a className="Playlist-save" onClick={this.props.onSave}>Save to Spotify</a>
      </div>
    );
  }
}