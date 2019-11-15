import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Form, Select, Input, Button, Modal } from 'antd';
import './css/FormInfo.css';
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
            status: ''
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
                reserveF: resp.data[0].reserveF
            })
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
                const { details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF} = this.state
                axios.post('/addCustomerInfo', ({ name, phoneNum, email, details, cost, dateCheckIn, dateCheckOut, reserveA, reserveB, reserveC, reserveD, reserveE, reserveF, status })).then(res => { console.log(res) })
                axios.delete('/deleteTempData')
            }
        });
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
            wrapperCol: { span: 7 },
        };
        return (
            <div class='body'>
                <div>
                    <h1 style={{ textAlign: 'center' }}>กรอกข้อมูล</h1>

                    <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                        <div style={{ marginLeft: '30%', marginRight: "20%" }}>
                            <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input your name!' }],
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="เบอร์ติดต่อ :" hasFeedback>
                                {getFieldDecorator('phone', {
                                    rules: [{ max: 10, message: 'Invalid Phonenumber' }, { required: true, message: 'Please input your phone number!' }],
                                })(<Input type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()}/>)}
                            </Form.Item>
                            <Form.Item label="E-mail" hasFeedback >
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ],
                                })(<Input/>)}
                            </Form.Item>
                        </div>
                        <TextArea name="Details" onChange={(value) => this.onchangeTextInput(value)}
                            placeholder="รายละเอียดเพิ่มเติมเช่น ต้องการเตียงเสริม (คิดเพิ่มชุดละ 100 บาท)"
                            style={{ width: '50%', marginLeft: '20%' }}
                        />

                        <Form.Item name="price">
                            <div style={{ textAlign: 'center' }}>ราคาทั้งหมด  {this.state.cost}</div>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                         </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(FormInfo);