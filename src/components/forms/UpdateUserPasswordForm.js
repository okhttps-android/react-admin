import React from 'react';
import {Form, Input, Modal} from "antd";
import VerificaCode from "../common/VerificaCode";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

/* 用户登录密码修改 */
class UpdateUserPasswordForm extends React.Component{

    render(){
        const { visible, onCancel, onCreate, form ,sendMsg,onRefBindSMSCode,phone,onChangeInputByPhone} = this.props;
        const { getFieldDecorator } = form;
        return <div>
            <Modal
                title="修改登录密码"
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
                            <Input    placeholder="请输入手机号" onChange={onChangeInputByPhone} disabled={true}/>
                        )}
                    </FormItem>
                    <FormItem label="新登录密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入新登录密码!' }],
                        })(
                            <Input type="password"   placeholder="请输入新登录密码" />
                        )}
                    </FormItem>
                    <FormItem label="验证码" {...{
                        labelCol: { span: 6 },
                        wrapperCol: { span: 16 },
                    }}>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入短信验证码!' }],
                        })(
                            <div className="flex"><Input  className="margin_right_10"  placeholder="请输入短信验证码" />
                                <VerificaCode  phone={phone} onRef={onRefBindSMSCode} sendMsg={sendMsg}></VerificaCode>
                            </div>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

export  default Form.create()(UpdateUserPasswordForm);