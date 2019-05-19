import React from 'react';
import {Button, Form, Input, Modal} from "antd";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
class UpdateWithDrawPasswordForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:'UpdateWithDrawPasswordForm'
        };
    }


    componentDidMount(){

    }

    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改提现密码"
                centered
                visible={visible}
                onOk={ onCreate}
                onCancel={ onCancel}
            >
                <Form >
                    <FormItem label="手机号" {...formItemLayout}>
                        {getFieldDecorator('user_tel', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input    placeholder="请输入手机号" />
                        )}
                    </FormItem>
                    <FormItem label="提现密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入提现密码!' }],
                        })(
                            <Input    placeholder="请输入提现密码" />
                        )}
                    </FormItem>
                    <FormItem label="验证码" {...{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 16 },
                    }}>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入短信验证码!' }],
                        })(
                            <div className="flex"><Input    placeholder="请输入短信验证码" />
                                <Button className="margin_left_10">发送验证码</Button>
                            </div>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

export  default Form.create()(UpdateWithDrawPasswordForm);