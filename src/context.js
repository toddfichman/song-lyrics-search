import React, { Component } from "react";
import axios from "axios";

//first create new context
const Context = React.createContext();

const reducer = (state, action) => {
  switch (
    action.type //action will an obj w/ a type
  ) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        trackList: action.payload,
        heading: "Search Results"
      };
    
    default:
      return state;
  }
};

// then create a provider component
export class Provider extends Component {
  state = {
    trackList: [],
    heading: "Top 10 Tracks",
    dispatch: action => this.setState(state => reducer(state, action)) //this allows a consumer to manipulate the state in context
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.REACT_APP_MUSIC_KEY
        }`
      )
      .then(res => {
        this.setState({ trackList: res.data.message.body.track_list });
      })
      .catch(err => console.log(err));
  }

  // need to return a context provider in render
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
