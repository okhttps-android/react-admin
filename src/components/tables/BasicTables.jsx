/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import {Row, Col, Card, Modal, Form, InputNumber, Input, Select, message, Button} from 'antd';
import SelectTable from './SelectTable';
import BreadcrumbCustom from '../BreadcrumbCustom';
import VerificaCode from "../common/VerificaCode";
import {account_bind, get_sms_code} from "../../http";
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};

class BasicTables extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'BasicTables',
            modalVisible: false,
            user_tel:null
        };
    }

    onChangeInputByPhone=(e)=>{
        console.log("onChangeInputByPhone():",e.target.value);
        this.state.user_tel=e.target.value;
        this.setState({user_tel:e.target.value})
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                  console.log("tel ()",values.tel);
                  console.log("tel ()",values.code);
                account_bind({tel: values.tel, code: values.code}).then(res=>{
                    if(res.message=='success'&&res.code==0){
                        message.success("账号绑定成功！");
                        this.setModalVisible(false);
                        //this.loadData({page: 0});
                        this.table.loadData({page:0});
                    }else{
                        message.error("绑定失败！"+res.data.message);
                    }
                }).catch(err=>{

                })
            }
        })
    }

    setModalVisible(modalVisible) {
        this.setState({ modalVisible});
    }

    sendMsg=()=>{
        this.props.form.validateFields((err, values) => {
            let user_tel=  values.tel;
            console.log("user_tel:",user_tel);
            if(user_tel!=null&&user_tel!=""&&user_tel!=" "){
                this.child.countDown();
                get_sms_code({user_tel: this.state.user_tel, auth_type: 2}).
                then(res=>{
                    console.log("get_sms_code result()",res.data);
                }).catch(err=>{
                    console.log(err)
                })
            }
        });

    }

    onRefBindSMSCode=(ref)=>{
        this.child = ref
    }
    onRefBindTable=(ref)=>{
        this.table = ref
    }

    onChangeInputByPhone=(e)=>{
        this.state.user_tel=e.target.value;
        this.setState({user_tel:e.target.value})
    }
   
    render(){
        const {form } = this.props;
        const { getFieldDecorator } = form;
        return    <div className="gutter-example">
            <BreadcrumbCustom first="用户管理" second="APP账号列表" />
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="APP账号列表" bordered={false}>
                            <Button type="primary" icon="plus" onClick={()=>{
                                this.setModalVisible(true)
                            }
                            }>
                                绑定账号
                            </Button>
                            <SelectTable  onRef={this.onRefBindTable}/>
                        </Card>
                    </div>
                </Col>
            </Row>

            <Modal
                title="APP账号绑定"
                centered
                visible={this.state.modalVisible}
                onOk={ this.handleSubmit}
                onCancel={() =>this.setModalVisible(false) }
            >
                <Form >
                    <FormItem label="手机号" {...formItemLayout} >
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: '请输入手机号!' }],
                        })(
                            <Input    placeholder="请输入手机号" onChange={this.onChangeInputByPhone}/>
                        )}
                    </FormItem>

                    <FormItem label="验证码" {...formItemLayout}>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入短信验证码!' }],
                        })(
                            <div className="flex"><Input  className="margin_right_10"  placeholder="请输入短信验证码" />
                                <VerificaCode  phone={this.state.user_tel} onRef={this.onRefBindSMSCode} sendMsg={this.sendMsg}></VerificaCode>
                            </div>
                        )}
                    </FormItem>



                </Form>
            </Modal>
        </div>
    }
}

export  default Form.create()(BasicTables);