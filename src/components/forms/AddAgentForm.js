import React from 'react';
import {Form, Input, Modal} from "antd";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
}
class AddAgentForm extends React.Component{

    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="添加下级代理"
                centered
                visible={visible}
                onOk={ onCreate}
                onCancel={ onCancel}
            >
                <Form >
                    <FormItem label="用户名" {...formItemLayout}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input    placeholder="请输入用户名" />
                        )}
                    </FormItem>
                    <FormItem label="密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input  type="password"   placeholder="请输入密码" />
                        )}
                    </FormItem>

                    <FormItem label="手机号" {...formItemLayout}>
                        {getFieldDecorator('user_tel', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input    placeholder="请输入手机号" />
                        )}
                    </FormItem>

                    <FormItem label="微信号" {...formItemLayout}>
                        {getFieldDecorator('wechat_no', {
                            rules: [{ required: false, message: '请输入微信号!' }],
                        })(
                            <Input    placeholder="请输入微信号" />
                        )}
                    </FormItem>

                    <FormItem label="QQ号" {...formItemLayout}>
                        {getFieldDecorator('qq_no', {
                            rules: [{ required: false, message: '请输入QQ号!' }],
                        })(
                            <Input    placeholder="请输入QQ号" />
                        )}
                    </FormItem>

                    <FormItem label="分成比例" {...formItemLayout}>
                        {getFieldDecorator('profit_rate_present_for_parent', {
                            rules: [{ required: true, message: '请输入分成比例!' }],
                        })(
                            <Input    placeholder="请输入分成比例" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

export  default Form.create()(AddAgentForm);