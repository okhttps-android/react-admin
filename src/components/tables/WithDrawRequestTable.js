import React from 'react';
import {Toast} from "antd-mobile";
import {get_withdaw_list,get_withdraw_request_add, get_withdraw_request_list, limit} from "../../http";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Button, Card, Col, Row, Table, Modal, Form, Input, Icon,Select,InputNumber} from "antd";
import {connectAlita} from "redux-alita";
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const Option = Select.Option;

class WithDrawRequestTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'提现记录',
            modalVisible: false,
            selectedRowKeys: [],
            children : [],
            data: [],
            pagination: {showQuickJumper:true},
            columns:[ {
                title: 'ID',
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
    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

   handleChange=(value)  => {
        console.log(`selected ${value}`);
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        const { query } = this.props;
        pager.current = pagination.current;
        this.setState({pagination: pager,});
        this.loadData({page: pagination.current-1,query:query});
    };
    componentDidMount(){
        this.loadData({page: 0});
        this.loadSelectData();
    }

    loadSelectData=()=>{
        const { setAlitaState } = this.props;
        get_withdaw_list({limit: 10, offset: 0})
            .then(res => {
                setAlitaState({ stateName: 'moneyAccount', data: res.data.data });
                this.setState({
                    data: this.state.data
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
    }

    loadData=(params={})=> {
        Toast.loading("")
        get_withdraw_request_list({limit: limit, offset: params.page*limit})
            .then(res => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].id + "",
                        create_time: res.data.data[i].create_time,
                        amount: res.data.data[i].amount,
                        withdraw_content_display: res.data.data[i]. withdraw_content_display,
                        status_display: res.data.data[i].status_display,

                    }
                    this.state.data.push(model);
                }
                this.setState({
                    data: this.state.data,
                    pagination
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
    }

    setModalVisible(modalVisible) {
        const { moneyAccount } = this.props;
        console.log("setModalVisible moneyAccount:" ,moneyAccount);
        if(moneyAccount!=null){
            this.state.children=[];
            for (let i = 0; i < moneyAccount.data.length; i++) {
                this.state.children.push(<Option key={moneyAccount.data[i].id+""}>{moneyAccount.data[i].content_display}</Option>);
            }
        }
        console.log("setModalVisible children:" ,this.state.children);
        this.setState({ modalVisible ,children:this.state.children});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values() money",values.money);
                console.log("values() password",values.password);
                console.log("values() moneyAccount",values.moneyAccount);
                this.setModalVisible(false);
                Toast.loading("");
                get_withdraw_request_add({
                    amount: values.money,
                    withdraw_account_id: values.moneyAccount.key,
                    withdraw_password:values.password})
                    .then(res=>{
                        Toast.hide();
                        console.log("res data:", res.data);
                        this.loadData({page: 0});
                    }).catch(err=>{
                    Toast.hide();
                })
            }
        });
    };

    render(){
        const {  form } = this.props;
        const { getFieldDecorator } = form;
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [{
                key: 'odd',
                text: '选择奇数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }, {
                key: 'even',
                text: '选择偶数列',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }],
            onSelection: this.onSelection,
        };
        return <div className="gutter-example">
            <BreadcrumbCustom first="提现管理" second="提现记录"/>
            <Row gutter={16}>
                <Col className="gutter-row" md={24}>
                    <div className="gutter-box">
                        <Card title="提现记录" bordered={false}>
                            <div>
                                <Button type="primary" icon="plus" onClick={()=>{
                                     this.setModalVisible(true)
                                }
                                }>
                                   新增
                                </Button>
                            </div>
                            <Table rowSelection={rowSelection}
                                   columns={this.state.columns}
                                   dataSource={this.state.data}
                                   pagination={this.state.pagination}
                                   onChange={this.handleTableChange}/>
                        </Card>
                    </div>
                </Col>
            </Row>

            <Modal
                title="提现请求-新增"
                centered
                visible={this.state.modalVisible}
                onOk={ this.handleSubmit}
                onCancel={() =>this.setModalVisible(false) }
            >
                <Form >
                    <FormItem label="提现金额" {...formItemLayout} >
                        {getFieldDecorator('money', {
                            rules: [{ required: true, message: '请输入提现金额!' }],
                        })(


                            <InputNumber min={1} max={1000000} defaultValue={1} onChange={()=>{}} />
                        )}
                    </FormItem>

                    <FormItem label="提现密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入提现密码!' }],
                        })(
                            <Input   type="password"  placeholder="请输入提现密码" />
                        )}
                    </FormItem>


                    <FormItem label="提现账户" {...formItemLayout}>
                        {getFieldDecorator('moneyAccount', {
                            rules: [{ required: true, message: '请输入提现账户!' }],
                        })(
                            <Select
                                labelInValue
                                style={{ width: '100%' }}
                                placeholder="请输入提现账户"
                                onChange={this.handleChange}>
                                {this.state.children}
                            </Select>,
                        )}
                    </FormItem>

                </Form>
            </Modal>
        </div>
    }
}

export  default connectAlita(['auth','moneyAccount'])(Form.create()(WithDrawRequestTable));