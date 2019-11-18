import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Card, Col, Row } from 'antd';
import '../css/FormInfo.css';
import axios from 'axios';
const { TextArea } = Input;



class FormInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phoneNum: '',
            email: '',
            details: '-',
            cost: 0,
            dateCheckIn: '',
            dateCheckOut: '',
            reserveA: 0,
            reserveB: 0,
            reserveC: 0,
            reserveD: 0,
            reserveE: 0,
            reserveF: 0,
            status: '',
            roomALabel: '',
            roomBLabel: '',
            roomCLabel: '',
            roomDLabel: '',
            roomELabel: '',
            roomFLabel: '',
            dateCount: 0
        }
    }


    componentDidMount() {
        axios.get('/findTempData').then(resp => {
            this.setState({
                cost: resp.data[0].cost,
                dateCheckIn: resp.data[0].dateCheckIn,
                dateCheckOut: resp.data[0].dateCheckOut,
                reserveA: resp.data[0].reserveA,
                reserveB: resp.data[0].reserveB,
                reserveC: resp.data[0].reserveC,
                reserveD: resp.data[0].reserveD,
                reserveE: resp.data[0].reserveE,
                reserveF: resp.data[0].reserveF,
                dateCount: resp.data[0].dateCount
            })
            if (resp.data[0].reserveA !== 0) {
                const roomALabel = "บ้านเดี่ยวหลังใหญ่ (600 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveA + "   ห้อง";
                this.setState({ roomALabel: roomALabel })
            }
            if (resp.data[0].reserveB !== 0) {
                const roomBLabel = "บ้านแฝดหลังเล็ก (400 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveB + "   ห้อง";
                this.setState({ roomBLabel: roomBLabel })
            }
            if (resp.data[0].reserveC !== 0) {
                const roomCLabel = "บ้านแฝด (500 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveC + "   ห้อง";
                this.setState({ roomCLabel: roomCLabel })
            }
            if (resp.data[0].reserveD !== 0) {
                const roomDLabel = "บ้านริมน้ำ (700 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveD + "   ห้อง";
                this.setState({ roomDLabel: roomDLabel })
            }
            if (resp.data[0].reserveE !== 0) {
                const roomELabel = "เรือนไทยหลังเล็ก (500 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveE + "   ห้อง";
                this.setState({ roomELabel: roomELabel })
            }
            if (resp.data[0].reserveF !== 0) {
                const roomFLabel = "เรือนไทยหลังใหญ่ (800 บาท/คืน) \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + this.state.reserveF + "   ห้อง";
                this.setState({ roomFLabel: roomFLabel })
            }
        })
    }


    showState = (e) => {
        console.log(this.state.name)
        console.log(this.state.phoneNum)
        console.log(this.state.email)
        console.log(this.state.cost)
        console.log(this.state.dateCheckIn)
        console.log(this.state.dateCheckOut)
        console.log(this.state.reserveA)
        console.log(this.state.reserveB)
        console.log(this.state.reserveC)
        console.log(this.state.reserveD)
        console.log(this.state.reserveE)
        console.log(this.state.reserveF)
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const name = values.name;
                const phoneNum = values.phone;
                const email = values.email;
                const status = 'จองที่พัก';
                console.log(name)
                console.log(phoneNum)
                console.log(email)
                const { details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF } = this.state
                axios.post('/addCustomerInfo', ({ name, phoneNum, email, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF, status })).then(res => { console.log(res) })
                axios.post('/AddStatus', ({ name, phoneNum, status }))
            }
        });
        window.location.href = '/ComfirmInfo'

    };

    onchangeTextInput = (value) => {
        console.log(value.target.value)
        this.setState({
            details: value.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };

        return (
            <div>
                <div>
                    <Card style={{ width: 1080, backgroundColor: '#FFE8D8' }}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                            <Row>
                                <Col span={13}>
                                    <Card style={{ width: 550, height: 300 }}>
                                        <div style={{ fontFamily: "Kanit, sans-serif" }} >
                                            <Form.Item label="ชื่อ-สกุล :" hasFeedback>
                                                {getFieldDecorator('name', {
                                                    rules: [{ required: true, message: 'กรุณากรอกชื่อ-นามสกุลของท่าน' }],
                                                })(<Input style={{ width: '8cm' }} />)}
                                            </Form.Item>
                                            <Form.Item label="หมายเลขติดต่อ :" hasFeedback>
                                                {getFieldDecorator('phone', {
                                                    rules: [{ max: 10, message: 'หมายเลขโทรศัพท์ไม่ถูกต้อง' }, { required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์ของท่าน' }],
                                                })(<Input style={{ width: '8cm' }} type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
                                            </Form.Item>
                                            <Form.Item label="E-mail" hasFeedback >
                                                {getFieldDecorator('email', {
                                                    rules: [
                                                        {
                                                            type: 'email',
                                                            message: 'รูปแบบของอีเมลไม่ถูกต้อง',
                                                        },
                                                        {
                                                            required: true,
                                                            message: 'กรุณากรอกอีเมลของท่าน',
                                                        },
                                                    ],
                                                })(<Input style={{ width: '8cm' }} />)}
                                            </Form.Item>
                                        </div>
                                        <Button style={{ marginLeft: '30%', fontFamily: "Kanit, sans-serif", fontSize: '20px' }} type="primary" htmlType="submit">
                                            ยืนยันข้อมูล
                                    </Button>
                                    </Card>

                                    <Card style={{ width: 550, height: 138, marginTop: '2%', fontFamily: "Kanit, sans-serif", fontSize: '20px' }}>
                                        <div style={{ textAlign: 'center' }}>ติดต่อสอบถาม</div>
                                        <div style={{ textAlign: 'center' }}>Line ID : @fangfangresort</div>
                                        <div style={{ textAlign: 'center' }}>หมายเลขติดต่อ : 08-6827-8255</div>
                                    </Card>

                                </Col>
                                <Col span={1}>
                                    <Card style={{ width: 450, height: 450 }} >
                                        <div style={{ fontFamily: "Kanit, sans-serif", fontSize: '15px' }}>
                                            <div style={{ fontFamily: "Kanit, sans-serif", fontSize: '20px', textAlign: 'center' }}>ข้อมูลการเข้าพัก</div>
                                            <div>--------------------------------------------------</div>
                                            <Card style={{ height: 170 }}>
                                                <div>{this.state.roomALabel}</div>
                                                <div>{this.state.roomBLabel}</div>
                                                <div>{this.state.roomCLabel}</div>
                                                <div>{this.state.roomDLabel}</div>
                                                <div>{this.state.roomELabel}</div>
                                                <div>{this.state.roomFLabel}</div>
                                            </Card>
                                            <div>--------------------------------------------------</div>
                                            <span style={{ marginRight: '60%' }}>วันที่เช็คอิน</span><span>{this.state.dateCheckIn}</span>
                                            <div><span style={{ marginRight: '57%' }}>วันที่เช็คเอาท์</span><span>{this.state.dateCheckOut}</span></div>
                                            <div><span style={{ marginRight: '57%' }}>ระยะเวลาเข้าพัก</span><span>{this.state.dateCount} คืน</span></div>
                                            <div>--------------------------------------------------</div>
                                            <span style={{ marginRight: '60%' }}>ราคาทั้งหมด</span><span>{this.state.cost} บาท</span>
                                            <div><span style={{ marginRight: '67.5%' }}>ค่ามัดจำ</span><span>{this.state.cost / 2} บาท</span></div>
                                            <div style={{ color: 'coral', fontSize: '14px', marginTop: '5%' }}>*หมายเหตุ โอนเฉพาะค่ามัดจำก่อนเท่านั้น</div>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>

                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Form.create()(FormInfo);