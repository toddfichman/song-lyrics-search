import React, { Component } from "react";
import axios from "axios";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export default class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=${process.env.REACT_APP_MUSIC_KEY}`
      )
      .then(res => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        

        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MUSIC_KEY}`
        );
      })
      .then(res => {
        //this is the response from 2nd request
        this.setState({ track: res.data.message.body.track });
        
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} <i className="fas fa-arrow-alt-circle-right" />
              <span className="text-secondary"> {track.artist_name}</span>
            </h5>
            <div className="card-body">
              {lyrics.lyrics_body.split("\n").map((lyric, i) => {
                
                return <p key={i} className="card-text lyrics">{lyric}</p>
              })}
            </div>
          </div>

          <ul className="list-group mt-3 mb-5">
            <li className="list-group-item">
              <strong>Album:</strong> {track.album_name}
            </li>
            <li className="list-group-item">
              <strong>Genre:</strong>{" "}
              {track.primary_genres.music_genre_list[0] ? (
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              ) : (
                <span>No Genre Provided</span>
              )}
            </li>
            <li className="list-group-item">
              <strong>Explicit:</strong> {track.explicit === 1 ? "Yes" : "No"}
            </li>
            <li className="list-group-item">
              <strong>Release Data:</strong>{" "}
              <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}
