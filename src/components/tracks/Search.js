import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

export default class Search extends Component {
  state = {
    trackTitle: ""
  };

  onChange = event => {
    //can use name attribute in input field so you can have 1 onChange function for various inputs
    this.setState({ [event.target.name]: event.target.value });
  };

  findTrack = (dispatch, event) => {
    event.preventDefault();

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MUSIC_KEY}`)
      .then(res => {
        dispatch({ //sending back to context to change track list
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: '' })
      })
      .catch(err => console.log(err))
    }
  

  render() {
    return (
      <Consumer>
        {value => { //value gives access to the dispatch func in context
        const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music" /> Search For A Song
              </h1>
              <p className="lead text-center">Get Any Song Lyrics</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}> {/*allowing findTrack to use dispatch*/} 
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="trackTitle"
                    placeholder="Song title..."
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block mb-5"
                  type="submit"
                >
                  Get Song Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
