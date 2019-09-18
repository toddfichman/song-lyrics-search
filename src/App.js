import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import Index from "./components/Layout/Index";
import Lyrics from "./components/tracks/Lyrics";

import { Provider } from "./context";

class App extends Component {
  render() {
    return (
      <Provider>
        {/* need to wrap whole app in Provider to access context value */}
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
