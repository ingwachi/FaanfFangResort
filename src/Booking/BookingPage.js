import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Menu, Modal } from 'antd';
import Booking from './Booking';
import '../css/BookingPage.css';

class BookingPage extends React.Component {

    render() {
        return (
            <div>
                <div class="sidenavBooking"/>
                <div class="w3-container" id="container">
                    <h1><b class="firstCha">F</b><b class="w3-jumbo">aang<b class="firstCha">F</b>ang Resort</b></h1>
                    <h1><b class="headLabel">จองห้องพัก</b></h1>
                    <hr class="w3-round"></hr>
                    <Booking/>
                </div>

            </div>
        );
    }
}
export default Form.create()(BookingPage);