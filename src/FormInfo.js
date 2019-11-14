import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Form, Select, Input, Button } from 'antd';
import './css/FormInfo.css'
const { TextArea } = Input;
const { Option } = Select;

class FormInfo extends Component {

    state = {
        name: '',
        phoneNum: '',
        email: '',
        details: '',
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



    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
        };
        return (
                <div class='body'>
                    <div>
                        <h1 style={{ textAlign:'center' }}>กรอกข้อมูล</h1>

                        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                            <div style={{ marginLeft: '30%', marginRight: "20%" }}>
                                <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Please input your name!' }],
                                    })(<Input />)}
                                </Form.Item>
                                <Form.Item label="เบอร์ติดต่อ :" hasFeedback>
                                    {getFieldDecorator('phone', {
                                        rules: [{max: 10, message: 'Invalid Phonenumber'},{ required: true, message: 'Please input your phone number!'}],
                                    })(<Input type='number' onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault() }/>)}
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
                                    })(<Input />)}
                                </Form.Item>
                            </div>
                            <TextArea name="Details" onChange={this.onchangeTextInput} 
                                placeholder="รายละเอียดเพิ่มเติมเช่น ต้องการเตียงเสริม (คิดเพิ่มชุดละ 100 บาท)"
                                style={{width:'50%', marginLeft:'20%'}}
                            />

                            <Form.Item name="price">
                                <div style={{textAlign:'center'}}>ราคาทั้งหมด  {this.state.cost}</div>
                            </Form.Item>
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                         </Button>
                            </Form.Item>
                        </Form></div>
                </div>
                );
            }
        }
        
export default Form.create()(FormInfo);