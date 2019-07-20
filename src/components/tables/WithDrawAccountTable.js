import React from 'react';
import {get_withdaw_list, update_bank, update_alipay, update_wechat} from "../../http";
import {Toast} from "antd-mobile";
import {Row, Col, Button, Card, Select, Form, message, Input, Modal} from 'antd';
import {connectAlita} from "redux-alita";
import BreadcrumbCustom from "../BreadcrumbCustom";
import '../../style/css/app-gloal.css'
import UpdateBankForm from "../forms/UpdateBankForm";
import UpdateAlipayForm from "../forms/UpdateAlipayForm";
import UpdateWechatForm from "../forms/UpdateWechatForm";

const Option = Select.Option;
let limit = 10;
class WithDrawAccountTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '提现账号',
            modalVisibleByBank: false,
            modalVisibleByAlipay: false,
            modalVisibleByWechat: false,
            selectedRowKeys: [],
            data: [],
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                onShowSizeChange: this.onShowSizeChange.bind(this),
                showTotal: (total) => (`共 ${total} 条`),
                pageSizeOptions: [
                    '10', '20', '30', '40', '50'
                ]
            },
            columns: [{
                title: '账号类型',
                dataIndex: 'id',
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
            }, {
                title: '金额',
                dataIndex: 'amount',
            }, {
                title: '提现账户信息',
                dataIndex: 'withdraw_content_display',
            }, {
                title: '状态',
                dataIndex: 'status_display',
            }],
        };
    }

    onShowSizeChange = (current, size) => {
        //console.log("onShowSizeChange() current:", current, "size:", size);
        limit = size;
    }


    componentDidMount() {
        this.loadData({page: 0});
    }

    loadData = (params = {}) => {
        const {setAlitaState} = this.props;
        get_withdaw_list({limit: limit, offset: params.page * limit})
            .then(res => {
                //console.log("result:" + JSON.stringify(res.data));
                setAlitaState({stateName: 'moneyAccount', data: res.data.data});
                this.state.data = [];
                let accountBank;
                let accountAlipay;
                let accountWechat;
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = res.data.data[i];
                    if (model.type == 3) {
                        // this.state.data.splice(0,0,model);
                        accountBank = model;
                    }
                    if (model.type == 2) {
                        // this.state.data.splice(1,0,model);
                        accountAlipay = model;
                    }
                    if (model.type == 1) {
                        // this.state.data.splice(2,0,model);
                        accountWechat = model;
                    }
                }
                this.state.data.push(accountBank);
                this.state.data.push(accountAlipay);
                this.state.data.push(accountWechat);
                this.setState({
                    data: this.state.data
                })

            }).catch(err => {
            //console.log("err:", err);
        })
    }

    setModalVisibleBank(modalVisibleByBank) {
        this.setState({modalVisibleByBank});
    }

    setModalVisibleAlipay(modalVisibleByAlipay) {
        this.setState({modalVisibleByAlipay});
    }

    setModalVisibleWechat(modalVisibleByWechat) {
        this.setState({modalVisibleByWechat});
    }


    updateBank = (e) => {
        e.preventDefault();
        this.formRefBank.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log("values() cardName:", values.cardName);
                //console.log("values() cardNo:", values.cardNo);
                //console.log("values() username:", values.username);
                this.setModalVisibleBank(false);
                update_bank({bank_name: values.cardName, bank_no: values.cardNo, real_name: values.username})
                    .then(res => {
                        //console.log("result:", res);
                        if (res.message == 'success' && res.code == 0) {
                            message.success("银行账号修改成功！");
                            this.loadData({page: 0});
                        } else {
                            message.error("修改失败！" + res.data.message);
                        }
                    }).catch(err => {
                    Toast.hide()
                    //console.log("err:", err);
                })

            }
        });
    };

    updateAlipay = (e) => {
        e.preventDefault();
        this.formRefAlipay.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log("values() cardNo:", values.cardNo);
                //console.log("values() username:", values.username);
                this.setModalVisibleAlipay(false);
                update_alipay({third_part_account: values.cardNo, real_name: values.username}).then(res => {
                    //console.log("result:" + JSON.stringify(res));
                    if (res.message == 'success' && res.code == 0) {
                        message.success("支付宝账号修改成功！");
                        this.loadData({page: 0});
                    } else {
                        message.error("修改失败！" + res.data.message);
                    }
                }).catch(err => {
                    Toast.hide()
                    //console.log("err:", err);
                })

            }
        });
    };

    updateWechat = (e) => {
        e.preventDefault();

        this.formRefWechat.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log("values() cardNo:", values.cardNo);
                //console.log("values() username:", values.username);
                this.setModalVisibleWechat(false);
                update_wechat({third_part_account: values.cardNo, real_name: values.username}).then(res => {
                    //console.log("result:" + JSON.stringify(res));
                    if (res.message == 'success' && res.code == 0) {
                        message.success("微信账号修改成功！");
                        this.loadData({page: 0});
                    } else {
                        message.error("修改失败！" + res.data.message);
                    }
                }).catch(err => {
                    Toast.hide()
                    //console.log("err:", err);
                })

            }
        });
    };

    saveFormRefBank = formRef => {
        this.formRefBank = formRef;
    };

    saveFormRefAlipay = formRef => {
        this.formRefAlipay = formRef;
    };

    saveFormRefWechat = formRef => {
        this.formRefWechat = formRef;
    };

    render() {
        const {form} = this.props;
        const {getFieldDecorator} = form;
        return <div className="gutter-example">
            <BreadcrumbCustom first="提现管理" second="提现账号"/>
            <Row>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>银行账户</span>
                            <Button size={"small"} onClick={() => {
                                this.setModalVisibleBank(true)
                            }
                            }>修改</Button></div>
                        {this.state.data[0] != null ? (<div>
                            <div>银行账户：{this.state.data[0].content_display}</div>
                        </div>) : (<div>
                            暂无银行账户信息
                        </div>)}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>支付宝账户 </span>
                            <Button size={"small"} onClick={() => {
                                this.setModalVisibleAlipay(true)
                            }}>修改</Button>
                        </div>
                        {this.state.data[1] != null ? (<div>
                            <div>支付宝账户：{this.state.data[1].content_display}</div>
                        </div>) : (<div>
                            暂无支付宝账户信息
                        </div>)}
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div className="margin_bottom_10">
                            <span className='span_19'>微信账户</span>
                            <Button size={"small"}
                                    onClick={() => {
                                        this.setModalVisibleWechat(true)
                                    }}
                            >修改</Button>
                        </div>
                        {this.state.data[2] != null ? (<div>
                            <div>微信账户：{this.state.data[2].content_display}</div>
                        </div>) : (<div>
                            暂无微信账户信息
                        </div>)}
                    </Card>
                </Col>
            </Row>

            {/*修改银行*/}
            <UpdateBankForm
                wrappedComponentRef={this.saveFormRefBank}
                visible={this.state.modalVisibleByBank}
                onCancel={this.setModalVisibleBank.bind(this, false)}
                onCreate={this.updateBank}/>
            {/*修改支付宝*/}
            <UpdateAlipayForm
                wrappedComponentRef={this.saveFormRefAlipay}
                visible={this.state.modalVisibleByAlipay}
                onCancel={this.setModalVisibleAlipay.bind(this, false)}
                onCreate={this.updateAlipay}
            />
            {/*修改微信*/}
            <UpdateWechatForm
                wrappedComponentRef={this.saveFormRefWechat}
                visible={this.state.modalVisibleByWechat}
                onCancel={this.setModalVisibleWechat.bind(this, false)}
                onCreate={this.updateWechat}/>
        </div>
    }
}

export  default connectAlita(['auth', 'moneyAccount'])(Form.create()(WithDrawAccountTable));