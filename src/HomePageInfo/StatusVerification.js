import { Steps, Icon, Button } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Select, message } from 'antd';
import axios from 'axios'
const { Option } = Select;
const { Step } = Steps;
const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

class statusVerification extends React.Component {

  state = {
    verifyStatus: 'รอการตรวจสอบ',
    current: '',
    status: ''
  }

  onClick = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const phoneNum = values.phone
        axios.get(`/findStatusByPhoneNum/${phoneNum}`).then(resp => {
          console.log("data:", resp)
          if(resp.data == "") {
            message.error('ไม่มีข้อมูลของท่านโปรดตรวจสอบหมายเลขโทรศัพท์หรือติดต่อทางรีสอร์ท')
          }
          if (resp.data.status == "จองที่พัก") {
            this.setState({
              current: 1,
              status: '',
              verifyStatus: 'รอการตรวจสอบ'
            })
          } else if (resp.data.status == "รอการตรวจสอบ") {
            this.setState({
              current: 2,
              status: '',
              verifyStatus: 'รอการตรวจสอบ'
            })
          } else if (resp.data.status == "การชำระเงินไม่ถูกต้อง") {
            this.setState({
              current: 2,
              status: 'error',
              verifyStatus: 'สลิปของท่านไม่ถูกต้องกรุณาติดต่อทางรีสอร์ท'
            })
          } else if (resp.data.status == "ชำระมัดจำแล้ว") {
            this.setState({
              current: 4,
              status: '',
              verifyStatus: 'สลิปของท่านถูกต้อง'
            })
          }
        }).catch((e) => console.log('ERROR', e));
      }
    })
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.onClick} >
          <Form.Item label="หมายเลขโทรศัพท์ผู้จอง :" hasFeedback>
            {getFieldDecorator('phone', {
              rules: [{ max: 10, min: 10, message: 'หมายเลขโทรศัพท์ไม่ถูกต้อง' }, { required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์ของท่าน' }],
            })(<Input type='number' onKeyDown={(evt) => (evt.key === 'e' || evt.key === '.' || evt.key === '-') && evt.preventDefault()} style={{ width: '10cm' }} />)}
          </Form.Item>
          <span><Button type="primary" style={{ fontFamily: "Kanit, sans-serif", marginLeft: '45%', marginBottom: '2%' }} htmlType="submit">ตรวจสอบ</Button></span>
          {/* <Steps >
            <Step status={this.state.reserveStatus} title={<div style={{ fontSize: '13px' }}>รอการชำระเงิน</div>} icon={<Icon style={{ fontSize: '20px' }} type="user" />} />
            <Step status={this.state.waitStatus} title={<div style={{ fontSize: '13px' }}>ตรวจสอบสลิป</div>} icon={<Icon style={{ fontSize: '20px' }} type="solution" />} />
            <Step status={this.state.verifyStatus} title={<div style={{ fontSize: '13px' }}>{this.state.receiptLabel}</div>} icon={<Icon type="file-image" />} />
            <Step status={this.state.fisnishStatus} title={<div style={{ fontSize: '13px' }}>เสร็จสิ้น</div>} icon={<Icon type="smile-o" />} />
          </Steps> */}
          <Steps type="navigation" current={this.state.current} status={this.state.status} style={stepStyle}>
            <Step title="ทำการจอง" description="รอการอัพโหลดสลิป" />
            <Step title="ตรวจสอบสลิป" description="ทำการตรวจสอบความถูกต้องของสลิป" />
            <Step title="ความถูกต้อง" description={this.state.verifyStatus} />
            <Step title="เสร็จสิ้น" description="ท่านสามารถเข้าพักได้ในวันที่เช็คอิน" />
          </Steps>
        </Form>

      </div>
    );
  }
}


export default Form.create()(statusVerification);