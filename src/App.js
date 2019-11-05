import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Booking from './Booking/Booking';
import TestPic from './TestPic';
import HomePage from './HomePageInfo/HomePage';
import ImageUpload from './Booking/ImageUpload';
import Signin from './Admin/Signin';
import BookingPage from './Booking/BookingPage';
import ShowAvailableRoom from './ShowAvailableRoom';

class App extends React.Component {
  render() {
  return (
    // <div className="App">
    //   <HomePage/>
    //   {/* <BookingPage/> */}
    //   {/* <Signin/> */}
    //   {/* <Booking/> */}
    //   {/* <ImageUpload/> */}
    // </div>
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/ShowAvailableRoom' component={ShowAvailableRoom}/>
        {/* <Route path='/SellAndBuy' component={SellAndBuy} /> */}
        {/* <Route path='/SellPage' component={Category}/>
        <Route path='/BuyPage' component={BuyCategory}/>
        <Route path='/Test' component={Test}/>
        <Route path='/Book' component={BookStore}/>
        <Route path='/Accessories' component={Accessary}/>
        <Route path='/AccessoriesStore' component={AccessaryStore}/>
        <Route path='/BooksStore' component={BookStore}/>
        <Route path='/ClothesStore' component={ClothesStore}/>
        <Route path='/OthersStore' component={OthersStore}/>
        <Route path='/Clothes' component={Shirt}/>
        <Route path='/Others' component={Others}/> */}
      </Switch>
    </Router>
  );
  }
}

export default App;
