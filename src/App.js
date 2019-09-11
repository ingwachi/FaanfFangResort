import React, { Component } from 'react';
import './css/App.css';
import Booking from './Booking';
import TestPic from './TestPic';
import HomePage from './HomePage';
import ImageUpload from './ImageUpload';
import UploadRoomAdmin from './UploadRoomAdmin';
import Signin from './Signin';


class App extends React.Component {
  render() {
  return (
    <div className="App">
      <HomePage/>
      {/* <Signin/> */}
      {/* <Booking/> */}
      {/* <ImageUpload/> */}
      {/* <UploadRoomAdmin/> */}
    </div>
  );
  }
}

export default App;
