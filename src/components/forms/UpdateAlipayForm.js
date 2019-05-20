import React from 'react';
import {Form, Input, Modal} from "antd";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
class UpdateAlipayForm extends React.Component{


    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改支付宝账户信息"
                centered
                visible={visible}
                onOk={ onCreate}
                onCancel={onCancel }
            >
                <Form >
                    <FormItem label="支付宝账户" {...formItemLayout}>
                        {getFieldDecorator('cardNo', {
                            rules: [{ required: true, message: '请输入支付宝账号!' }],
                        })(
                            <Input    placeholder="请输入支付宝账号" />
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

export  default Form.create()(UpdateAlipayForm);