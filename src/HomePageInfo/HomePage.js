import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Menu, Modal } from 'antd';
import Booking from '../Booking/Booking';
import '../css/HomePage.css';
import '../css/navw3.css';
import Room1 from './Room1';
import Room2 from './Room2';
import Room3 from './Room3';
import Room4 from './Room4';
import Room5 from './Room5';
import Room6 from './Room6';
import Map from '../Map/Map';
import room1 from '../img/room1/room.png';
import room2 from '../img/room2/room.png';
import room3 from '../img/room3/room.png';
import room4 from '../img/room4/room.png';
import room5 from '../img/room5/room.jpg';
import room6 from '../img/room6/room.jpg';
import logo from '../img/resort/logo.png';
import Contact from './Contact';
import Confirm from './Confirm';
const { SubMenu } = Menu;

class HomePage extends React.Component {

    handleDropdownClick = () => {
        var dropdown = document.getElementsByClassName("dropdown-btn");
        var i;
        for (i = 0; i < dropdown.length; i++) {
            dropdown[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var dropdownContent = this.nextElementSibling;
                if (dropdownContent.style.display === "block") {
                    dropdownContent.style.display = "none";
                } else {
                    dropdownContent.style.display = "block";
                }
            });
        }
    }
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <div class="sidenav">
                    <div>
                        <img src={logo} class="logo" />
                    </div>
                    <a href="#" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">หน้าหลัก</a>
                    <button class="dropdown-btn" id="navLabel" onClick={this.handleDropdownClick} >รายละเอียดห้อง<i onClick={this.handleDropdownClick} class="fa fa-caret-down"></i></button>
                    <div class="dropdown-container">
                        <a href="#BigSingleHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">บ้านเดี่ยวหลังใหญ่</a>
                        <a href="#SmallSingleHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">บ้านแฝดหลังเล็ก</a>
                        <a href="#TwinHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">บ้านแฝด</a>
                        <a href="#RiverSideHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">บ้านริมน้ำ</a>
                        <a href="#SmallThaiHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">เรือนไทยหลังเล็ก</a>
                        <a href="#BigThaiHouse" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">เรือนไทยหลังใหญ่</a>
                    </div>
                    <a href="#Map" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">แผนที่และการเดินทาง</a>
                    <a href="#Contact" onclick="w3_close()" class="w3-bar-item w3-button w3-hover-white" id="navLabel">ติดต่อเรา</a>

                    <a onClick={this.showModal} class="w3-bar-item w3-button w3-hover-white" id="navLabel">ตรวจสอบสถานะการจอง</a>
                    <Modal
                        title="ตรวจสอบสถานะการจอง"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Confirm/>
                    </Modal>

                </div>

                <div class="w3-container" id="container">
                    <h1><b class="firstCha">F</b><b class="w3-jumbo">aang<b class="firstCha">F</b>ang Resort</b></h1>
                    <h1><b class="smallCha">Room Types</b></h1>
                    <hr class="w3-round"></hr>

                    <div class="w3-row-padding">
                        <div class="w3-half">
                            <div class="container">
                                <img src={room1} onclick="onClick(this)" alt="Concrete meets bricks" class="picture" />
                                <a class="roomLabel">บ้านเดี่ยวหลังใหญ่ 600 บาท/คืน</a>
                            </div>
                            <div class="container">
                                <img src={room3} onclick="onClick(this)" alt="Light, white and tight scandinavian design" class="picture" />
                                <a class="roomLabel">บ้านแฝดหลังเล็ก 400 บาท/คืน</a>
                            </div>
                            <div class="container">
                                <img src={room5} onclick="onClick(this)" alt="White walls with designer chairs" class="picture" />
                                <a class="roomLabel">เรือนไทยหลังเล็ก 500 บาท/คืน</a>
                            </div>
                        </div>

                        <div class="w3-half">
                            <div class="container">
                                <img src={room2} onclick="onClick(this)" alt="Windows for the atrium" class="picture" />
                                <a class="roomLabel1">บ้านแฝด 500 บาท/คืน</a>
                            </div>
                            <div class="container">
                                <img src={room4} onclick="onClick(this)" alt="Bedroom and office in one space" class="picture" />
                                <a class="roomLabel1">บ้านริมน้ำ 700 บาท/คืน</a>
                            </div>
                            <div class="container">
                                <img src={room6} onclick="onClick(this)" alt="Scandinavian design" class="picture" />
                                <a class="roomLabel">เรือนไทยหลังใหญ่ 800 บาท/คืน</a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div id="BigSingleHouse">
                        <Room1 />
                    </div>
                    <hr />
                    <div id="SmallSingleHouse">
                        <Room2 />
                    </div>
                    <hr />
                    <div id="TwinHouse">
                        <Room3 />
                    </div>
                    <hr />
                    <div id="RiverSideHouse">
                        <Room4 />
                    </div>
                    <hr />
                    <div id="SmallThaiHouse">
                        <Room5 />
                    </div>
                    <hr />
                    <div id="BigThaiHouse">
                        <Room6 />
                    </div>
                    <hr />
                    <div id="Map">
                        <Map />
                    </div>
                </div >
                <div style={{ marginLeft: "20%" }} id="Contact">
                    <Contact />
                </div>
            </div>
        );
    }

}


export default Form.create()(HomePage);