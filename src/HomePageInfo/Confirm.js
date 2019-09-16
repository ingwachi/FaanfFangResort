import { Steps, Icon } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Select} from 'antd';
const { Option } = Select;
const { Step } = Steps;

class Confirm extends React.Component {

    render() {
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
        return (
            <div>
                <Form.Item label="หมายเลขโทรศัพท์ผู้จอง :" hasFeedback>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input addonBefore={prefixSelector} />)}
                </Form.Item>
                <Steps>
                    <Step status="finish" title="Login" icon={<Icon type="user" />} />
                    <Step status="process" title="Verification" icon={<Icon type="solution" />} />
                    <Step status="wait" title="Pay" icon={<Icon type="loading" />} />
                    <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                </Steps>
            </div>
        );
    }
}


export default Form.create()(Confirm);