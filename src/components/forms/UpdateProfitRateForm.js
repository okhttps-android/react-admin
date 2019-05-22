
import React from 'react';
import {Form, Input, Modal} from "antd";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
}
/**
 * Created by Arison on 15:34.
 */
class UpdateProfitRateForm extends React.Component{

    render(){
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改下级代理分成比例"
                centered
                visible={visible}
                onOk={ onCreate}
                onCancel={ onCancel}
            >
                <Form >
                {/*    <FormItem label="分成比例" {...formItemLayout}>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: '请输入分成比例!' }],
                        })(
                            <Input  placeholder="请输入分成比例" />
                        )}
                    </FormItem>*/}
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

export  default  Form.create()(UpdateProfitRateForm);
