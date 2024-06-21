import React, { useState } from "react";
import axios from "axios";

const PlaylistCreator = ({ accessToken }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [description, setDescription] = useState("");
  const [tracks, setTracks] = useState("");

  const createPlaylist = () => {
    axios
      .post(
        "https://api.spotify.com/v1/users/{user_id}/playlists",
        {
          name: playlistName,
          description: description,
          public: false,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const playlistId = response.data.id;
        axios.post(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            uris: tracks.split(","),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
      });
  };

  return (
    <div>
      <h2>Create a New Playlist</h2>
      <input
        type="text"
        placeholder="Playlist Name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Track URIs (comma separated)"
        value={tracks}
        onChange={(e) => setTracks(e.target.value)}
      />
      <button onClick={createPlaylist}>Create Playlist</button>
    </div>
  );
};

export default PlaylistCreator;
