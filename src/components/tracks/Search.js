import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
import { Link } from "react-router-dom";

export default class Search extends Component {
  state = {
    trackTitle: "",
    suggestedTracks: [],
    trackOrArtist: 'track'
  };

  onChange = (event, dispatch) => {
    //can use name attribute in input field so you can have 1 onChange function for various inputs
    this.setState({ trackTitle: event.target.value }, () => {
      if (this.state.trackTitle && this.state.trackTitle.length > 1) {
        if (this.state.trackTitle.length % 2 === 0) {
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_${this.state.trackOrArtist}=${
                this.state.trackTitle
              }&page_size=7&page=1&s_track_rating=desc&apikey=${
                process.env.REACT_APP_MUSIC_KEY
              }`
            )
            .then(res => {
              this.setState({
                suggestedTracks: res.data.message.body.track_list
              });
              
            })
            .catch(err => console.log(err));
        }
      } else if (!this.state.trackTitle) {
      }
    });
  };

  findTrack = (dispatch, event) => {
    event.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_${this.state.trackOrArtist}=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${
          process.env.REACT_APP_MUSIC_KEY
        }`
      )
      .then(res => {
        
        dispatch({
          //sending back to context to change track list
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: "" });
        this.setState({ suggestedTracks: []})
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Consumer>
        {value => {
          //value gives access to the dispatch func in context
          const { dispatch } = value;
          let content = this.state.suggestedTracks.map(item => {
            return (
              <li key={item.track.track_id} className="suggestion-item fade-in">
                <Link to={`lyrics/track/${item.track.track_id}`} className="suggestion-link">
                  <i className="fas fa-play" />{' '}
                  <strong>{item.track.track_name}</strong>{" "}
                  by {" "}
                  <strong>{item.track.artist_name}</strong>
                </Link>
              </li>
            );
          });

          return (
            <React.Fragment>
              <div className="card card-body mb-4 p-4">
                <h1 className="display-4 text-center">
                  <i className="fas fa-music" /> Search For A Song
                </h1>
                <p className="lead text-center">Get Any Song Lyrics</p>
                <h5>Search by ...</h5>
                <div className="category-button-container">
                  <button
                      className="btn btn-dark mb-3 category-button"
                      // type="submit"
                      style={this.state.trackOrArtist === 'track' ? {backgroundColor: '#9E9E9E', color: 'black'} : null}
                      onClick={() => this.setState({trackOrArtist: 'track'})}
                    >
                      Track
                    </button>
                    <button
                      className="btn btn-dark mb-3 category-button"
                      style={this.state.trackOrArtist === 'artist' ? {backgroundColor: '#9E9E9E', color: 'black'} : null}
                      onClick={() => this.setState({trackOrArtist: 'artist'})}
                    >
                      Artist
                    </button>

                </div>
                <form onSubmit={this.findTrack.bind(this, dispatch)}>  {/*allowing findTrack to use dispatch*/}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="trackTitle"
                      placeholder="Song title..."
                      value={this.state.trackTitle}
                      onChange={event => this.onChange(event, dispatch)}
                    />
                  </div>

                  <button
                    className="btn btn-dark btn-lg btn-block mb-5 search-button"
                    type="submit"
                  >
                    Get Song Lyrics
                  </button>
                  <div className="suggestions-container">
                    {this.state.suggestedTracks.length ? (
                      <h3 className="fade-in">Suggestions: </h3>
                    ) : null}
                    <ul className="suggestions-list">{content}</ul>
                  </div>
                </form>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
