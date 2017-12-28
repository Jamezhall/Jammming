const clientId = '6e39525503334827ab0a8a4a21d709ab';
//const redirectUri = 'http://jammmingwithjames.surge.sh/';
const redirectUri = 'http://localhost:3000/';
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

let accessToken;
let expiresIn;

const Spotify = {
  getAccessToken() {

    if(accessToken) {
      return accessToken;
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    
    if(urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = Number(urlExpiresIn[1]);
      //Wipes the access token and URL parameters
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      //Alert for testing. Current codecademy task produces an unituitive interface (ie no click to login)
      alert('Not Authorized. Click to connect to Spotify.')
      window.location.href = spotifyAuthUrl;
    }
  },

  search(term) {
    if (!accessToken) Spotify.getAccessToken();
    //According to Spotify API Docs https://developer.spotify.com/web-api/search-item/ spaces need to be encoded
    const searchTerm = `https://api.spotify.com/v1/search?type=track&q=${term.replace(/ /g, '%20')}`;
    const headers = { headers: {Authorization: `Bearer ${accessToken}`} };

    return fetch(searchTerm, headers).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          };
        });
    });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris || trackUris.length === 0) return;
    const getUserApi = 'https://api.spotify.com/v1/me';
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId;
    let playlistId;

    //GET the current User ID
    fetch(getUserApi, {
      headers: headers 
    })
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)

    //create the playlist
    .then(() => {
      const createPlaylistApi = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(createPlaylistApi, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            name: playlistName
          })
        })
        .then(response => response.json())
        .then(jsonResponse => playlistId = jsonResponse.id)
        
        // POST the playlist to spotify
        .then(() => {
          const addTracksToPlaylistApi = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addTracksToPlaylistApi, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackUris
            })
          });
        })
    })
  }
};

export default Spotify;