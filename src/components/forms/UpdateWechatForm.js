import React from 'react';
import {Form, Input, Modal} from "antd";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
class UpdateWechatForm extends React.Component{


    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改微信账户信息"
                centered
                visible={visible}
                onOk={ onCreate}
                onCancel={ onCancel}
            >
                <Form >
                    <FormItem label="微信账号" {...formItemLayout}>
                        {getFieldDecorator('cardNo', {
                            rules: [{ required: true, message: '请输入微信账号!' }],
                        })(
                            <Input    placeholder="请输入微信账号" />
                        )}
                    </FormItem>
                    <FormItem label="姓名" {...formItemLayout}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input    placeholder="请输入姓名" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

export  default  Form.create()(UpdateWechatForm);