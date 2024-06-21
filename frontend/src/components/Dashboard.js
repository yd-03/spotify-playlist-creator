import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistCreator from "./PlaylistCreator";

const Dashboard = ({ code }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((response) => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setExpiresIn(response.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  // トークンの有効期限が切れた場合の処理
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((response) => {
          setAccessToken(response.data.accessToken);
          setExpiresIn(response.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return (
    <div>
      <h1>Welcome to Spotify Playlist Creator</h1>
      <PlaylistCreator accessToken={accessToken} />
    </div>
  );
};

export default Dashboard;
