const clientId = '6e39525503334827ab0a8a4a21d709ab';
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
      //not sure if this is the correct way to access the matched expressions... will see what it spits out. Task in codecademy not very helpful.
      accessToken = urlAccessToken[1];
      expiresIn = Number(urlExpiresIn[1]);
      //Wipes the access token and URL parameters
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location.href = spotifyAuthUrl;
    }
  },

  search(term) {
    if (!accessToken) Spotify.getAccessToken(); 
    //According to Spotify API Docs https://developer.spotify.com/web-api/search-item/ spaces need to be encoded
    const searchTerm = `https://api.spotify.com/v1/search?type=track&q=${term.replace(/ /g, '%20')}`;
    const myInit = { headers: {Authorization: `Bearer ${accessToken}`} };

    return fetch(searchTerm, myInit).then(response => {
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
  }
}

export default Spotify;