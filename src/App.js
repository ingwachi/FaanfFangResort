import React, { Component } from 'react';
import './css/App.css';
import Booking from './Booking/Booking';
import TestPic from './TestPic';
import HomePage from './HomePageInfo/HomePage';
import ImageUpload from './Booking/ImageUpload';
import Signin from './Admin/Signin';
import BookingPage from './Booking/BookingPage';


class App extends React.Component {
  render() {
  return (
    <div className="App">
      <HomePage/>
      {/* <BookingPage/> */}
      {/* <Signin/> */}
      {/* <Booking/> */}
      {/* <ImageUpload/> */}
    </div>
  );
  }
}

export default App;
