import React from 'react';
import Tracks from '../tracks/Tracks';
import Search from '../tracks/Search';
// import Suggestions from '../tracks/Suggestions'

const Index = () => {
  return (
    <React.Fragment>
      <Search />
      
      <Tracks />
    </React.Fragment>
  )
}

export default Index;
