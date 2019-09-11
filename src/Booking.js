import React ,{Component} from 'react';
import firebase from './firebase'
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { Form, Select, Input, Button,Card, Col, Row,InputNumber } from 'antd';
import room1 from './img/room1/room.png';
import room2 from './img/room2/room.png';
import room3 from './img/room3/room.png';
import room4 from './img/room4/room.png';
import room5 from './img/room5/room.jpg';
import room6 from './img/room6/room.jpg';
import './css/testPic.css';
import './css/Booking.css';
const { TextArea } = Input;
const {  RangePicker } = DatePicker;
const db = firebase.firestore();
const dateFormat = 'DD/MM/YYYY';
const { Option } = Select;
var day,num8d,numA,numB,numC,numD,num5D ;
Date.daysBetween = function( date1, date2 ) {
    //Get 1 day in milliseconds
    var one_day=1000*60*60*24;
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms; 
    // Convert back to days and return
    return Math.round(difference_ms/one_day); 
}
class Booking extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            DateCheckIn : "",
            DateCheckOut : "",
            Price : "",
            Type : "",
            Name : "",
            Tell : "",
            Email : "",
            Details : "", 
            Earnest : "" //เงินมัดจำ
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            var total = (num8d*800)+(numA*600)+(numB*400)+((numC+numD)*500)+(num5D*700)
            console.log('price', total);
            console.log('/2', total/2);
            db.collection("Booking").add({
                Name : values.name,
                Tell : values.prefix+values.phone,
                Email : values.email,
                DateCheckIn : this.state.DateCheckIn,
                DateCheckOut : this.state.DateCheckOut,
                Details : this.state.Details,
                //ต้องเพิ่ม price & earnest
            })
          }
        });
    };
    onChangeNumber8d = (value) => {
        num8d = value;
        console.log('num8d:',num8d)
    }
    onChangeNumber5d = (value) => {
        num5D = value;
    }
    onChangeNumberA = (value) => {
        numA = value;
    }
    onChangeNumberB = (value) => {
        numB = value;
    }
    onChangeNumberC = (value) => {
        numC = value;
    }
    onChangeNumberD = (value) => {
        numD = value;
    }
    onChangeDate = (date, dateString) => {
        console.log(date, dateString);
        var y2k  = new Date(dateString[0].split('/')[2], dateString[0].split('/')[1], dateString[0].split('/')[0]); 
        var today= new Date(dateString[1].split('/')[2], dateString[1].split('/')[1], dateString[1].split('/')[0]);
        day = Date.daysBetween(y2k, today)
        console.log('Day: ', day);
        this.setState({
            DateCheckIn : dateString[0],
            DateCheckOut : dateString[1],

        },)
        
      }
    onchangeTextInput = (e) => {
        // console.log(e.target.value);
        this.setState({
            [e.target.name] : e.target.value
        }, 
        // console.log(this.state)
        )
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 7 },
          };
          const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '+66',
          })(
            <Select style={{ width: 70 ,background: '#FFFFFF'}}>
              <Option value="08">+66</Option>
            </Select>,
          );
          const rangeConfig = {
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          };
        return (
           <div class = 'body'>
               <div style={{ background: 'coral'}}>
               <h1 style={{marginTop: '%5'}}>จองห้องพัก</h1>
               
               <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                    <div style={{ marginLeft: '30%', marginRight: "20%" }}>
                        <Form.Item label="ชื่อผู้จอง :" hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input your name!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="เบอร์ติดต่อ :" hasFeedback>
                            {getFieldDecorator('phone', {
                                rules: [{ required: true, message: 'Please input your phone number!' }],
                            })(<Input addonBefore={prefixSelector}/>)}
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
                        <Form.Item label="เวลาที่ต้องการ check-in & check-out" hasFeedback>
                            {getFieldDecorator('checkinout', rangeConfig)(<RangePicker 
                            onChange={this.onChangeDate} format={dateFormat}/>)}
                        </Form.Item>
                    </div>
                    <div class = 'picblock' >
                            <Row gutter={16}>
                            <Col span={8}>
                                <Card  title="Card title"  bordered={false}>
                                <img src = {room1} id ="headbookct" class = "editpic"/>
                                    <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumber8d}/>
                            </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                <img src = {room2} id ="headbookct" class = "picture"/>
                                <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumberA} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                <img src = {room3} id ="headbookct" class = "picture"/>
                                <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumber5d} />
                                </Card>
                            </Col>
                            
                            </Row>

                        <div style={{ background: '#DCDCDC', marginTop: '5%'}}></div>
                            <Row gutter={16}>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                <img src = {room4} id ="headbookct" class = "picture"/>
                                <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumberD} />
                                </Card>
                            </Col>
                            
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                <img src = {room5} id ="headbookct" class = "picture"/>
                                <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumberC} />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="Card title" bordered={false}>
                                <img src = {room6} id ="headbookctt" class = "picture"/>
                                <InputNumber min={0} max={10} defaultValue={0}  onChange={this.onChangeNumberB} />
                                </Card>
                            </Col>

                            </Row>
                        </div>
                        
                    <TextArea name="Details" onChange={this.onchangeTextInput} id = "detailsBox"
                        placeholder="รายละเอียดเพิ่มเติมเช่น ต้องการเตียงเสริม (คิดเพิ่มชุดละ 100 บาท)"
                    />

                    <Form.Item label="ยอดค่าใช้จ่ายทั้งหมด : " name="price"> 
                        <span className="ant-form-text">0</span>
                    </Form.Item>
                    <Form.Item label="เงินมัดจำที่ต้องจ่าย : " name="earnest">
                        <span className="ant-form-text">0</span>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
               </Form></div>
           </div>
        )
    }

}


export default Form.create()(Booking);