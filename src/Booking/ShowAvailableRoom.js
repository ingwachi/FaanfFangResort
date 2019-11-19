import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Link, useHistory, Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Col, Row, Button, message } from 'antd';
import room1 from '../img/room1/room.png';
import room2 from '../img/room2/room.png';
import room3 from '../img/room3/room.png';
import room4 from '../img/room4/room.png';
import room5 from '../img/room5/room.jpg';
import room6 from '../img/room6/room.jpg';
var dateList = [];

class ShowAvailableRoom extends Component {

    state = {
        dateCheckIn: '',
        dateCheckOut: '',
        mintypeA: 10,
        mintypeB: 8,
        mintypeC: 6,
        mintypeD: 1,
        mintypeE: 5,
        mintypeF: 2,
        reserveA: 0,
        reserveB: 0,
        reserveC: 0,
        reserveD: 0,
        reserveE: 0,
        reserveF: 0,
        typeA: 0,
        typeB: 0,
        typeC: 0,
        typeD: 0,
        typeE: 0,
        typeF: 0,
        cost: 0,
        priceRoomA: 600,
        priceRoomB: 500,
        priceRoomC: 400,
        priceRoomD: 700,
        priceRoomE: 500,
        priceRoomF: 800,
    }

    onSubmit = () => {
        for (let i = 0; i < dateList.length - 1; i++) {
            axios.get(`/${dateList[i]}`).then(resp => {
                this.setState({
                    typeA: resp.data.typeA - this.state.reserveA,
                    typeB: resp.data.typeB - this.state.reserveB,
                    typeC: resp.data.typeC - this.state.reserveC,
                    typeD: resp.data.typeD - this.state.reserveD,
                    typeE: resp.data.typeE - this.state.reserveE,
                    typeF: resp.data.typeF - this.state.reserveF
                })
                const { typeA, typeB, typeC, typeD, typeE, typeF } = this.state;
                axios.put(`/updateRoom/${dateList[i]}`, ({ typeA, typeB, typeC, typeD, typeE, typeF })).then(response => {
                    console.log(response)
                })
            })
        }
        const dateCount = dateList.length - 1
        const { cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF } = this.state
        axios.post('/addTempData', ({ cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF, dateCount })).then(res => {
            console.log(res)
        })
        console.log('Room A Reserved :' + this.state.reserveA)
        console.log('Room B Reserved :' + this.state.reserveB)
        console.log('Room C Reserved :' + this.state.reserveC)
        console.log('Room D Reserved :' + this.state.reserveD)
        console.log('Room E Reserved :' + this.state.reserveE)
        console.log('Room F Reserved :' + this.state.reserveF)
        console.log('Cost : ', this.state.cost)
        console.log('CheckIn : ', this.state.dateCheckIn)
        console.log('CheckOut : ', this.state.dateCheckOut)
        if (this.state.reserveA === 0 &&
            this.state.reserveB === 0 &&
            this.state.reserveC === 0 &&
            this.state.reserveD === 0 &&
            this.state.reserveE === 0 &&
            this.state.reserveF === 0) {
            message.error('กรุณาเลือกประเภทและจำนวนห้องพัก');
        } else {
            message.loading('ระบบกำลังบันทึกข้อมูล', 1)
            .then(() => message.success('บันทึกข้อมูลเสร็จสิ้น', 1))
            setTimeout(function () {
                window.location.href = '/CustomerInfo'
            }, 2000);
        }

    }

    addAllDate = (date) => {
        console.log("Date : ", date);

        date.forEach(element => {
            dateList.push(element);
        });
    }

    componentWillMount() {
        this.addAllDate(this.props.dates)
        this.show()
        this.setState({
            dateCheckIn: dateList[0],
            dateCheckOut: dateList[dateList.length - 1]
        })

    }


    async show() {
        await dateList.forEach(date => {
            axios.get(`/${date}`).then(resp => {
                if (resp.data.typeA < this.state.mintypeA) {
                    this.setState({ mintypeA: resp.data.typeA })
                }

                if (resp.data.typeB < this.state.mintypeB) {
                    this.setState({ mintypeB: resp.data.typeB })

                }

                if (resp.data.typeC < this.state.mintypeC) {
                    this.setState({ mintypeC: resp.data.typeC })

                }

                if (resp.data.typeD < this.state.mintypeD) {
                    this.setState({ mintypeD: resp.data.typeD })

                }

                if (resp.data.typeE < this.state.mintypeE) {
                    this.setState({ mintypeE: resp.data.typeE })

                }

                if (resp.data.typeF < this.state.mintypeF) {
                    this.setState({ mintypeF: resp.data.typeF })
                }
            })
        })
    }

    increaseRoomA = () => {
        if (this.state.mintypeA === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveA + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeA) {
                count = this.state.mintypeA;
            }
            else {
                money += this.state.priceRoomA;
            }
            this.setState({ reserveA: count, cost: money });
        }

    };

    declineRoomA = () => {
        let count = this.state.reserveA - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomA;
        }
        this.setState({ reserveA: count, cost: money });
    };

    increaseRoomB = () => {
        if (this.state.mintypeB === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveB + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeB) {
                count = this.state.mintypeB;
            }
            else {
                money += this.state.priceRoomB;
            }
            this.setState({ reserveB: count, cost: money });
        }

    };

    declineRoomB = () => {
        let count = this.state.reserveB - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomB;
        }
        this.setState({ reserveB: count, cost: money });
    };

    increaseRoomC = () => {
        if (this.state.mintypeC === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveC + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeC) {
                count = this.state.mintypeC;
            }
            else {
                money += this.state.priceRoomC;
            }
            this.setState({ reserveC: count, cost: money });
        }

    };

    declineRoomC = () => {
        let count = this.state.reserveC - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomC;
        }
        this.setState({ reserveC: count, cost: money });
    };

    increaseRoomD = () => {
        if (this.state.mintypeD === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveD + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeD) {
                count = this.state.mintypeD;
            }
            else {
                money += this.state.priceRoomD;
            }
            this.setState({ reserveD: count, cost: money });
        }

    };

    declineRoomD = () => {
        let count = this.state.reserveD - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomD;
        }
        this.setState({ reserveD: count, cost: money });
    };

    increaseRoomE = () => {
        if (this.state.mintypeE === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveE + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeE) {
                count = this.state.mintypeE;
            }
            else {
                money += this.state.priceRoomE;
            }
            this.setState({ reserveE: count, cost: money });
        }

    };

    declineRoomE = () => {
        let count = this.state.reserveE - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomE;
        }
        this.setState({ reserveE: count, cost: money });
    };

    increaseRoomF = () => {
        if (this.state.mintypeF === 0) {
            message.error('ขออภัยไม่มีห้องว่างเพียงพอ')
        } else {
            var count = this.state.reserveF + 1;
            var money = this.state.cost;
            if (count > this.state.mintypeF) {
                count = this.state.mintypeF;
            }
            else {
                money += this.state.priceRoomF;
            }
            this.setState({ reserveF: count, cost: money });
        }

    };

    declineRoomF = () => {
        let count = this.state.reserveF - 1;
        let money = this.state.cost;
        if (count < 0) {
            count = 0;
        }
        else {
            money -= this.state.priceRoomF;
        }
        this.setState({ reserveF: count, cost: money });
    };

    render() {
        return (
            <div>
                {console.log(this.props.dates)}
                <Row>
                    <Col span={15}>
                        <Card style={{ width: 610, height: 1600, backgroundColor: '#FFE8D8' }}>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>บ้านเดี่ยวหลังใหญ่</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room1} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 600 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeA} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomA} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveA}
                                                <Button onClick={this.increaseRoomA} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>บ้านแฝด</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room3} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 500 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeB} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomB} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveB}
                                                <Button onClick={this.increaseRoomB} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>บ้านแฝดหลังเล็ก</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room2} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 400 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeC} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomC} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveC}
                                                <Button onClick={this.increaseRoomC} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>บ้านริมน้ำ</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room4} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 700 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeD} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomD} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveD}
                                                <Button onClick={this.increaseRoomD} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>เรือนไทยหลังเล็ก</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room5} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 500 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeE} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomE} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveE}
                                                <Button onClick={this.increaseRoomE} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                            <Card style={{ width: 550, marginBottom: '1%' }}>
                                <div style={{ marginBotton: '3%', fontFamily: 'Kanit, sans-serif', fontSize: '30px' }}>เรือนไทยหลังใหญ่</div>
                                <Row>
                                    <Col span={12}>
                                        <img src={room6} style={{ width: '90%' }} />
                                    </Col>
                                    <Col span={12}>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>ราคา 800 บาท/คืน </p>
                                        <p style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>จำนวนห้องว่าง {this.state.mintypeF} ห้อง</p>
                                        <div style={{ marginTop: '12%', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                                            จำนวนห้องที่ต้องการ :
                                            <div style={{ marginTop: '5%' }}>
                                                <Button onClick={this.declineRoomF} icon="minus" style={{ marginRight: '15%' }} />
                                                {this.state.reserveF}
                                                <Button onClick={this.increaseRoomF} icon="plus" style={{ marginLeft: '15%' }} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                    </Col>
                    <Col span={1}>
                        <div>
                            <Card style={{ width: 320, height: 200, position: 'fixed', backgroundColor: '#FFE8D8' }} >
                                <Card style={{ width: 270, height: 150 }}>
                                    <div style={{ marginLeft: '7%' }}>
                                        <div style={{ fontFamily: "Kanit, sans-serif", fontSize: '18px' }}>
                                            ราคาทั้งหมด {this.state.cost} บาท
                                    </div>
                                        <div style={{ marginTop: '5%', fontFamily: "Kanit, sans-serif", fontSize: '18px' }}>
                                            เงินมัดจำ {this.state.cost / 2} บาท
                                    </div>
                                        <Button style={{ marginLeft: '10%', marginTop: '5%', fontFamily: "Kanit, sans-serif", fontSize: '20px' }} type="primary" onClick={this.onSubmit} >สำรองห้องพัก</Button>
                                    </div>
                                </Card>
                            </Card>
                        </div>
                        <Card style={{ marginTop: '15%', width: 320, height: 225, position: 'fixed', backgroundColor: '#FFE8D8' }}>
                            <Card style={{ width: 270, height: 175 }}>
                                <div style={{ marginLeft: '4%' }}>
                                    <div style={{ fontFamily: "Kanit, sans-serif" }}>
                                        <div style={{ color: '#6C6560', fontSize: '18px' }}>วันที่เช็คอิน</div>
                                        <div style={{ marginLeft: '8%', fontSize: '15px' }} >{dateList[0]} ตั้งแต่ 12.00 น.</div>
                                        <div style={{ color: '#6C6560', fontSize: '18px' }}>วันที่เช็คเอาท์</div>
                                        <div style={{ marginLeft: '8%', fontSize: '15px' }}>{dateList[dateList.length - 1]} จนถึง 11.00 น.</div>
                                        <div style={{ color: '#6C6560', fontSize: '18px' }}>ระยะเวลาเข้าพัก {dateList.length - 1} คืน</div>
                                    </div>
                                </div>
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dates: state
    }
}
export default connect(mapStateToProps)(ShowAvailableRoom);


