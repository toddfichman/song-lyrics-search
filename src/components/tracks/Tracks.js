import React, { Component } from 'react';
import {Consumer} from '../../context'
import Spinner from '../Layout/Spinner';
import Track from './Track'

export default class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => { //value is whatever you set value equal to in context.js
          const { trackList, heading } = value

          if(trackList === undefined || trackList.length === 0) {
            return <Spinner />
          } else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {trackList.map(item => (
                    <Track key={item.track.track_id} track={item.track}/>
                  ))}
                </div>
              </React.Fragment>
            )
          }
        }}
      </Consumer>
    )
  }
}
