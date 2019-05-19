import React from 'react';
import { Button, Modal, Form, Input} from 'antd';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
class UpdateBankForm extends React.Component{

    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改银行账户信息"
                centered
                visible={visible}
                onOk={onCreate}
                onCancel={onCancel}
            >
                <Form >
                    <FormItem label="银行名称" {...formItemLayout} >
                        {getFieldDecorator('cardName', {
                            rules: [{ required: true, message: '请输入银行名称(省市区及支行名称)!' }],
                        })(
                            <Input    placeholder="省市区及支行名称" />
                        )}
                    </FormItem>

                    <FormItem label="银卡卡号" {...formItemLayout}>
                        {getFieldDecorator('cardNo', {
                            rules: [{ required: true, message: '请输入银行卡号!' }],
                        })(
                            <Input    placeholder="请输入银行卡号" />
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

export  default Form.create()(UpdateBankForm);