import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My New Playlist',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    //https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e/8217459#8217459
    //https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
    let idExists = this.state.playlistTracks.some( theTrack => theTrack['id'] === track.id );
    if (idExists === false) {
      //https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
      this.setState({playlistTracks: [...this.state.playlistTracks, track]});    
    }
  }

  removeTrack(id) {
    let filteredItems = this.state.playlistTracks.filter( item => {
      if(item.id !== id) return item;
    });

    this.setState({
      playlistTracks: filteredItems
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(i => i.uri);
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({
      playlistName: 'My New Jammming Playlist',
      playlistTracks: []
    });
  }

  search(term) {
    console.log(`%c Jammming Search: ${term} `, 'background: #000; color: #6c41ec; display: block; font-weight: bold');
    Spotify.search(term)
    .then(searchResults => this.setState({
      searchResults: searchResults
    }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist 
              isRemoval={true} 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
