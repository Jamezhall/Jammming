import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {id: 444, name: 'Starving', artist: 'Haliee Steinfield', album: 'Starving'},
        {id: 555, name: 'That\'s what I like', artist: 'Bruno Mars', album: '24K Magic'},
        {id: 777, name: 'Wolves', artist: 'Selena Gomez, Marshmello', album: 'Wolves'}
      ],
      playlistName: 'My New Playlist',
      playlistTracks:[
        {id: 111, name: 'Re: Stacks', artist: 'Bon Iver', album: 'For Emma, Forever Ago'},
        {id: 222, name: 'Paris', artist: 'The Chainsmokers', album: 'Paris'},
        {id: 333, name: 'Sexy Dirty Love', artist: 'Demi Lovato', album: 'Tell Me You Love Me'}
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
    var filteredItems = this.state.playlistTracks.filter( item => {
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist 
              isRemoval={true} 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
