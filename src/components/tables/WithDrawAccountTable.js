import React from 'react';
import {get_withdaw_list, update_bank, update_alipay, update_wechat,limit} from "../../http";
import {Toast} from "antd-mobile";
import {Row, Col, Button, Card, Select, Form, message, Input, Modal} from 'antd';
import {connectAlita} from "redux-alita";
import BreadcrumbCustom from "../BreadcrumbCustom";
import '../../style/css/app-gloal.css'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const Option = Select.Option;

class WithDrawAccountTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'提现账号',
            modalVisibleByBank: false,
            modalVisibleByAlipay: false,
            modalVisibleByWechat: false,
            selectedRowKeys: [],
            data: [],
            pagination: {showQuickJumper:true},
            columns:[ {
                title: '账号类型',
                dataIndex: 'id',
            },{
                title: '创建时间',
                dataIndex: 'create_time',
            },{
                title: '金额',
                dataIndex: 'amount',
            },{
                title: '提现账户信息',
                dataIndex: 'withdraw_content_display',
            },{
                title: '状态',
                dataIndex: 'status_display',
            }],
        };
    }
    
    
    componentDidMount(){
        this.loadData({page: 0});
    }

    loadData=(params={})=> {
        const { setAlitaState } = this.props;
        Toast.loading("")
        get_withdaw_list({limit: limit, offset: params.page*limit})
            .then(res => {
                console.log("result:"+JSON.stringify(res.data));
                setAlitaState({ stateName: 'moneyAccount', data: res.data.data });
                this.setState({
                    data: res.data.data
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
    }

    setModalVisibleBank(modalVisibleByBank) {
        this.setState({ modalVisibleByBank});
    }

    setModalVisibleAlipay(modalVisibleByAlipay) {
        this.setState({ modalVisibleByAlipay });
    }

    setModalVisibleWechat(modalVisibleByWechat) {
        this.setState({ modalVisibleByWechat });
    }


    updateBank = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values() cardName:",values.cardName);
                console.log("values() cardNo:",values.cardNo);
                console.log("values() username:",values.username);
                this.setModalVisibleBank(false);
                update_bank({bank_name:values.cardName,bank_no:values.cardNo,real_name:values.username})
                    .then(res => {
                    console.log("result:"+JSON.stringify(res.data));
                      if(res.data.message=='success'&&res.data.code==0){
                           message.success("银行账号修改成功！");
                          this.loadData({page: 0});
                      }else{
                          message.errors("修改失败！"+res.data.message);
                      }
                }).catch(err => {
                    Toast.hide()
                    console.log("err:", err);
                })

            }
        });
    };

    updateAlipay = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values() cardNo:",values.cardNo);
                console.log("values() username:",values.username);
                this.setModalVisibleAlipay(false);
                update_alipay({third_part_account:values.cardNo,real_name:values.username}).then(res => {
                    console.log("result:"+JSON.stringify(res.data));
                    if(res.data.message=='success'&&res.data.code==0){
                        message.success("支付宝账号修改成功！");
                        this.loadData({page: 0});
                    }else{
                        message.errors("修改失败！"+res.data.message);
                    }
                }).catch(err => {
                    Toast.hide()
                    console.log("err:", err);
                })

            }
        });
    };

    updateWechat = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values() cardNo:",values.cardNo);
                console.log("values() username:",values.username);
                this.setModalVisibleWechat(false);
              update_wechat({third_part_account:values.cardNo,real_name:values.username}).then(res => {
                  console.log("result:"+JSON.stringify(res.data));
                  if(res.data.message=='success'&&res.data.code==0){
                      message.success("微信账号修改成功！");
                      this.loadData({page: 0});
                  }else{
                      message.errors("修改失败！"+res.data.message);
                  }
              }).catch(err => {
                  Toast.hide()
                  console.log("err:", err);
              })

            }
        });
    };

    render(){
        const {  form } = this.props;
        const { getFieldDecorator } = form;
        return <div className="gutter-example">
            <BreadcrumbCustom first="提现管理" second="提现账号"/>
            <Row>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>银行账户</span>
                            <Button size={"small"} onClick={()=>{
                            this.setModalVisibleBank(true)}
                            }>修改</Button></div>
                        {this.state.data.length!=0?(<div>
                            <div>银行账户：{this.state.data[0].content_display}</div>
                        </div>):(<div>
                                暂无银行账户信息
                        </div>)}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>支付宝账户 </span>
                            <Button size={"small"} onClick={()=>{
                            this.setModalVisibleAlipay(true)}}>修改</Button>
                        </div>
                        {this.state.data.length!=0?(<div>
                            <div>支付宝账户：{this.state.data[1].content_display}</div>
                        </div>):(<div>
                            暂无支付宝账户信息
                        </div>)}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>微信账户</span>
                            <Button size={"small"}
                                    onClick={()=>{
                                        this.setModalVisibleWechat(true)}}
                            >修改</Button>
                        </div>
                        {this.state.data.length!=0?(<div>
                            <div>微信账户：{this.state.data[2].content_display}</div>
                        </div>):(<div>
                            暂无微信账户信息
                        </div>)}
                    </Card>
                </Col>
            </Row>

            {/*修改银行*/}
            <Modal
                title="修改银行账户信息"
                centered
                visible={this.state.modalVisibleByBank}
                onOk={ this.updateBank}
                onCancel={() =>this.setModalVisibleBank(false) }
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
            {/*修改支付宝*/}
            <Modal
                title="修改支付宝账户信息"
                centered
                visible={this.state.modalVisibleByAlipay}
                onOk={ this.updateAlipay}
                onCancel={() =>this.setModalVisibleAlipay(false) }
            >
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
            </Modal>
            {/*修改微信*/}
            <Modal
                title="修改微信账户信息"
                centered
                visible={this.state.modalVisibleByWechat}
                onOk={ this.updateWechat}
                onCancel={() =>this.setModalVisibleWechat(false) }
            >
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
            </Modal>
        </div>
    }
}

export  default connectAlita(['auth','moneyAccount'])(Form.create()(WithDrawAccountTable));