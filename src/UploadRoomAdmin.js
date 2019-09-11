// import React from 'react';
// import ReactDOM from 'react-dom';
// import firebase from './firebase';
// import { DatePicker } from 'antd';
// import 'antd/dist/antd.css';
// import { Form, Select, Input, Button, Card, Col, Row, InputNumber } from 'antd';
// import './css/UploadRoomAdmin.css';
// import zoneA from './img/resort/zoneA.png';
// import zoneB from './img/resort/zoneB.png';
// import zoneC from './img/resort/zoneC.png';
// import zoneD from './img/resort/zoneD.jpg';
// import z5D from './img/resort/5D.png';
// import zone8d from './img/resort/zoneE.jpg';
// const { TextArea } = Input;
// const { RangePicker } = DatePicker;
// const db = firebase.firestore();
// const dateFormat = 'DD/MM/YYYY';
// const { Option } = Select;
// var day, num8d, numA, numB, numC, numD, num5D;
// Date.daysBetween = function (date1, date2) {
//     //Get 1 day in milliseconds
//     var one_day = 1000 * 60 * 60 * 24;
//     // Convert both dates to milliseconds
//     var date1_ms = date1.getTime();
//     var date2_ms = date2.getTime();
//     // Calculate the difference in milliseconds
//     var difference_ms = date2_ms - date1_ms;
//     // Convert back to days and return
//     return Math.round(difference_ms / one_day);
// }

// class UploadRoomAdmin extends React.Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             DateCheckIn: "",
//             DateCheckOut: "",
//             Price: "",
//             Type: "",
//             Name: "",
//             Tell: "",
//             Email: "",
//             Details: "",
//             Earnest: "" //เงินมัดจำ
//         }
//     }
//     handleSubmit = e => {
//         e.preventDefault();
//         this.props.form.validateFields((err, values) => {
//             if (!err) {
//                 console.log('Received values of form: ', values);
//                 var total = (num8d * 800) + (numA * 600) + (numB * 400) + ((numC + numD) * 500) + (num5D * 700)
//                 console.log('price', total);
//                 console.log('/2', total / 2);
//                 db.collection("Booking").add({
//                     Name: values.name,
//                     Tell: values.prefix + values.phone,
//                     Email: values.email,
//                     DateCheckIn: this.state.DateCheckIn,
//                     DateCheckOut: this.state.DateCheckOut,
//                     Details: this.state.Details,
//                     //ต้องเพิ่ม price & earnest
//                 })
//             }
//         });
//     };
//     onChangeNumber8d = (value) => {
//         num8d = value;
//         console.log('num8d:', num8d)
//     }
//     onChangeNumber5d = (value) => {
//         num5D = value;
//     }
//     onChangeNumberA = (value) => {
//         numA = value;
//     }
//     onChangeNumberB = (value) => {
//         numB = value;
//     }
//     onChangeNumberC = (value) => {
//         numC = value;
//     }
//     onChangeNumberD = (value) => {
//         numD = value;
//     }
//     onChangeDate = (date, dateString) => {
//         console.log(date, dateString);
//         var y2k = new Date(dateString[0].split('/')[2], dateString[0].split('/')[1], dateString[0].split('/')[0]);
//         var today = new Date(dateString[1].split('/')[2], dateString[1].split('/')[1], dateString[1].split('/')[0]);
//         day = Date.daysBetween(y2k, today)
//         console.log('Day: ', day);
//         this.setState({
//             DateCheckIn: dateString[0],
//             DateCheckOut: dateString[1],

//         })

//     }
//     onchangeTextInput = (e) => {
//         // console.log(e.target.value);
//         this.setState({
//             [e.target.name]: e.target.value
//         },
//             // console.log(this.state)
//         )
//     }
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         const formItemLayout = {
//             labelCol: { span: 6 },
//             wrapperCol: { span: 7 },
//         };
//         const prefixSelector = getFieldDecorator('prefix', {
//             initialValue: '+66',
//         })(
//             <Select style={{ width: 70, background: '#FFFFFF' }}>
//                 <Option value="08">+66</Option>
//             </Select>,
//         );
//         const rangeConfig = {
//             rules: [{ type: 'array', required: true, message: 'Please select time!' }],
//         };
//         return (
//             <div>
//                 <nav class="w3-sidebar w3-collapse w3-top w3-large w3-padding" id="mySidebar"></nav>
//                 <div class="w3-container">
//                     <h1><b class="head1">Update Room Type</b></h1>
//                     <h1><b class="head2">Admin Only</b></h1>
//                     <hr class="w3-round"></hr>
//                     <hr></hr>

//                     <Form {...formItemLayout} onSubmit={this.handleSubmit} >
//                         <div class='setLabel'>
//                             <div id='infobook'>ชื่อผู้จอง (Name) :</div>
//                             <Form.Item hasFeedback>
//                                 {getFieldDecorator('name', {
//                                     rules: [{ required: true, message: 'Please input your name!'}],
//                                 })(<Input style={{ width: '500px' }} placeholder="ชื่อ - นามสกุล"/> ) }
//                             </Form.Item>
//                             <div id='infobook'>เบอร์ติดต่อ (Tel.) :</div>
//                             <Form.Item hasFeedback>
//                                 {getFieldDecorator('phone', {
//                                     rules: [{ required: true, message: 'Please input your phone number!' }],
//                                 })(<Input addonBefore={prefixSelector} style={{ width: '500px' }} />)}
//                             </Form.Item>
//                             <div id='infobook'>E-mail :</div>
//                             <Form.Item hasFeedback>
//                                 {getFieldDecorator('email', {
//                                     rules: [
//                                         {
//                                             type: 'email',
//                                             message: 'The input is not valid E-mail!',
//                                         },
//                                         {
//                                             required: true,
//                                             message: 'Please input your E-mail!',
//                                         },
//                                     ],
//                                 })(<Input style={{ width: '500px' }} placeholder="XXX@YYYY.com"/>)}
//                             </Form.Item>
//                             <div id='infobook'>เวลาที่ต้องการ check-in & check-out :</div>
//                             <Form.Item hasFeedback>
//                                 {getFieldDecorator('checkinout', rangeConfig)(<RangePicker
//                                     onChange={this.onChangeDate} format={dateFormat} style={{ width: '500px' }}/>)}
//                             </Form.Item>
//                         </div>
//                         <div class='picblock' >
//                             <Row gutter={16}>
//                                 <Col span={8}>
//                                     <Card title="เรือนไทยหลังใหญ่" bordered={false}>
//                                         <img src={zone8d} id="headbookct" class="editpic" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumber8d} />
//                                     </Card>
//                                 </Col>
//                                 <Col span={8}>
//                                     <Card title="บ้านเดี่ยวหลังใหญ่" bordered={false}>
//                                         <img src={zoneA} id="headbookct" class="picture" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumberA} />
//                                     </Card>
//                                 </Col>
//                                 <Col span={8}>
//                                     <Card title="บ้านริมน้ำ" bordered={false}>
//                                         <img src={z5D} id="headbookct" class="picture" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumber5d} />
//                                     </Card>
//                                 </Col>

//                             </Row>

//                             <div id='middle'></div>
//                             <Row gutter={16}>
//                                 <Col span={8}>
//                                     <Card title="เรือนไทยหลังเล็ก" bordered={false}>
//                                         <img src={zoneD} id="headbookct" class="picture" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumberD} />
//                                     </Card>
//                                 </Col>

//                                 <Col span={8}>
//                                     <Card title="บ้านแฝด" bordered={false}>
//                                         <img src={zoneC} id="headbookct" class="picture" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumberC} />
//                                     </Card>
//                                 </Col>
//                                 <Col span={8}>
//                                     <Card title="บ้านเดี่ยวหลังเล็ก" bordered={false}>
//                                         <img src={zoneB} id="headbookctt" class="picture" />
//                                         <InputNumber min={0} max={10} defaultValue={0} onChange={this.onChangeNumberB} />
//                                     </Card>
//                                 </Col>

//                             </Row>
//                         </div>

//                         <TextArea name="Details" onChange={this.onchangeTextInput} id='detailsBox'
//                             placeholder="รายละเอียดเพิ่มเติมเช่น ต้องการเตียงเสริม (คิดเพิ่มชุดละ 100 บาท)"
//                             autosize={{ minRows: 2, maxRows: 4 }}
//                         />

//                         <div class='lastLabel'>

//                             <Form.Item label="ยอดค่าใช้จ่ายทั้งหมด : " name="price">
//                                 <span className="ant-form-text">0</span>
//                             </Form.Item>
//                             <Form.Item label="เงินมัดจำที่ต้องจ่าย : " name="earnest">
//                                 <span className="ant-form-text">0</span>
//                             </Form.Item>
//                             <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
//                                 <Button type="primary" htmlType="submit">
//                                     Submit
//                         </Button>
//                             </Form.Item></div>
//                     </Form></div>
//             </div>
//         );
//     }
// }

// export default Form.create()(UploadRoomAdmin);