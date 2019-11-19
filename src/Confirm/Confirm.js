import React, { Component } from 'react';
import "antd/dist/antd.css";
import { storage } from '../firebase';
import firebase from '../firebase'
import axios from 'axios';
import { Form, Input, Button, Select, Upload, Icon, message, DatePicker, TimePicker } from 'antd';
import { async } from 'q';
const { Option } = Select;
const db = firebase.firestore();
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            name: "",
            phoneNum: "",
            datePayment: "",
            timePayment: "",
            price: "",
            url: null,
            loading: false,
            progress: 0,
            status: "รอการตรวจสอบ",
            statusUpload: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { image } = this.state;
                console.log("image", image);
                if (this.state.image == null) {
                    message.error("กรุณาอัพโหลดสลิป")
                } else {
                    const uploadTask = storage.ref(`images/${image.name}`).put(image);
                    uploadTask.on('state_changed',
                        async (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            console.log("progress", progress);
                            if (progress !== 100) {
                                this.setState({ statusUpload: 'กรุณารอการอัพโหลดรูป' })
                            }
                        },
                        (error) => {
                            console.log('error', error);
                        },
                        () => {
                            // complete function ....
                            storage.ref('images').child(image.name).getDownloadURL().then(url2 => {
                                console.log("url", url2);
                                this.setState({ statusUpload: '' })
                                this.setState({ url: url2 });
                                const name = values.name;
                                const phoneNum = values.phone;
                                const datePayment = values['date-picker'].format('DD-MM-YYYY');
                                const timePayment = values['time-picker'].format('HH:mm');
                                const price = values.Price;
                                const { url, status } = this.state

                                axios.get(`/findCustomerByPhone/${phoneNum}`).then(resp => {
                                    const id = resp.data.id
                                    axios.post('/addReceiptInfo', ({ id, name, phoneNum, datePayment, timePayment, price, url, status })).then(resp => {
                                        console.log(resp);
                                    })
                                    axios.put(`/updateStatusRecById/${resp.data.id}`, ({ status }))
                                    axios.put(`/updateStatusCusById/${resp.data.id}`, ({ status }))
                                    message
                                        .loading('ระบบกำลังบันทึกข้อมูล', 1)
                                        .then(() => message.success('กำลังบันทึกข้อมูล', 1))

                                    setTimeout(function () {
                                        window.location.href = "/FinishPayment"
                                    }, 2000);
                                })


                            })
                        });
                }
            }
        });

    };
    handleChange = e => {
        console.log(e)
        if (e.fileList[0]) {
            const image = e.fileList[0].originFileObj;
            this.setState(() => ({ image }));
        }
        if (e.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (e.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(e.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }


    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 15 },
        };
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'กรุณากรอกชื่อ-นามสกุลของท่าน' }],
                        })(<Input onKeyDown={(evt) => (evt.key === '0' || evt.key === '1' || evt.key === '2'
                            || evt.key === '3' || evt.key === '4' || evt.key === '5' || evt.key === '6' || evt.key === '7'
                            || evt.key === '8' || evt.key === '9') && evt.preventDefault()} />)}
                    </Form.Item>
                    <Form.Item label="หมายเลขติดต่อ :" hasFeedback>
                        {getFieldDecorator('phone', {
                            rules: [{ max: 10, min: 10, message: 'หมายเลขโทรศัพท์ไม่ถูกต้อง' }, { required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์ของท่าน' }],
                        })(<Input type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
                    </Form.Item>
                    <Form.Item label="จำนวนเงินที่โอน :" hasFeedback>
                        {getFieldDecorator('Price', {
                            rules: [{ required: true, message: 'กรุณากรอกจำนวนเงินที่โอน' }],
                        })(<Input type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} />)}
                    </Form.Item>
                    <Form.Item label="เวลาที่โอน">
                        {getFieldDecorator('date-picker', {
                            rules: [{ required: true, message: 'กรุณาเลือกวันที่โอนเงิน' }]
                        })(<DatePicker />)}
                    </Form.Item>
                    <Form.Item label="เวลที่โอนมัดจำ">
                        {getFieldDecorator('time-picker', {
                            rules: [{ required: true, message: 'กรุณาเลือกเวลาที่โอน' }]
                        })(<TimePicker format={"HH:mm"} />)}
                    </Form.Item>

                    <div style={{ textAlign: 'center', color: 'black' }}>อัพโหลดหลักฐานการชำระเงิน</div>
                    <div style={{ marginLeft: '36%' }}>
                        <Upload
                            name="avatar"
                            // type="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </div>
                    <div style={{ color: 'red', marginLeft: '32%' }}>{this.state.statusUpload}</div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '60%', fontFamily: "Kanit, sans-serif" }}>
                            ยืนยันข้อมูล
                        </Button>
                    </Form.Item>
                </Form>


            </div>
        )
    }
}
export default Form.create()(Confirm);