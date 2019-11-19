import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Carousel } from 'antd';
import '../css/roomInfo.css';
import room6 from '../img/room6/room.jpg';
import room6Pic1 from '../img/room6/1.jpg';
import room6Pic2 from '../img/room6/2.jpg';

class Room6 extends React.Component {
    render() {
        return (
            <div>
                <h1><b id="roomTLB">เรือนไทยหลังใหญ่</b></h1>
                <h1><b id="priceLB">800 บาท/คืน</b></h1>
                <hr class="w3-round"></hr>
                <div>
                    <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                        <div class="col-xl-8 col-lg-7">
                            <Carousel autoplay effect="fade">
                                <div>
                                    <img id="imgInfo" src={room6} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room6Pic1} />
                                </div>
                                <div>
                                    <img id="imgInfo" src={room6Pic2} />
                                </div>
                            </Carousel>
                        </div>
                        <div class="col-xl-4 col-lg-5">
                            <div class="featured-text text-center text-lg-left">
                                <h4 class="headLabel">เรือนไทยหลังใหญ่</h4>
                                <p class="description">มีความเป็นส่วนตัวอย่างมากเนื่องจากมีพื้นที่แต่ละหลังให้ลูกค้าที่เข้ามาพัก ตัวบ้านมีความเย็นเนื่องจากใช้ไม้ที่ระบายอากาศได้ดี และมีต้นไม่ล้อมรอบเยอะทำให้ร่มเย็นมากขึ้น ครอบครัวไหนต้องการบริเวณสามารถเข้าพักได้ เพียงคืนละ 800 บาท</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Room6);