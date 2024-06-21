import React from "react";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=playlist-modify-private playlist-modify-public`;

const Login = () => {
  return (
    <div>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default Login;
