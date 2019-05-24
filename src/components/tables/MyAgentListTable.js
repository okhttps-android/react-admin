import React from 'react';
import {Toast} from "antd-mobile";
import {get_agent_list, agent_add,update_agent_profit_rate} from "../../http";
import {Button, Card, Col, Row, Table,message} from "antd";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {get_thousand_num} from "../../utils/index";
import UpdateProfitRateForm from "../forms/UpdateProfitRateForm";
import AddAgentForm from "../forms/AddAgentForm";

let limit=10;

class MyAgentListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'MyUserListTable',
            selectedRowKeys: [],
            selectId:null,
            modalVisibleByProfitRate:false,
            modalVisibleByAddAgent:false,
            pagination: {
                showQuickJumper:true,
                showSizeChanger:true,
                onShowSizeChange:this.onShowSizeChange.bind(this),
                showTotal:(total)=>(`共 ${total} 条`),
                pageSizeOptions:[
                    '10','20','30','40','50'
                ]},
            data: [],
            columns: [{
                title: '代理账号ID',
                dataIndex: 'id',
            }, {
                title: '用户名',
                dataIndex: 'nick_name',
            }, {
                title: '余额',
                dataIndex: 'user_money',
            }, {
                title: '总流水',
                dataIndex: 'recharge_amount_all',
            }
            , {
                title: '总佣金',
                dataIndex: 'profit_amount_all',
            }
            , {
                title: '代理分成%（相对自己的占比）',
                dataIndex: 'profit_rate_present_for_parent',
                render: (text, record) =>{

                    return (<div className="flex_center">
                        {text}
                        <a onClick={()=>{
                            this.addProfitRef.props.form.setFieldsValue({
                                profit_rate_present_for_parent: text,
                            });
                            this.setState({selectId:record.id});
                            this.setModalVisibleProfitRate(true)
                        }}
                            style={{marginLeft:"10px", color:"blue",textDecoration:"underline"}}> 修改</a>
                    </div>);
                 }
            }, {
                title: '代理分成%（绝对占比）',
                dataIndex: 'profit_rate',
            }, {
                    title: '创建时间',
                    dataIndex: 'create_time',
                }
            ]
        };
    }
    onShowSizeChange=(current,size)=>{
        console.log("onShowSizeChange() current:",current,"size:",size);
        limit=size;
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({pagination: pager,});
        this.loadData({page: pagination.current-1
        });
    };

    loadData=(params={})=> {
        Toast.loading("")
        get_agent_list({limit: limit, offset: params.page})
            .then(res => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].id + "",
                        nick_name: res.data.data[i].username,
                        create_time: res.data.data[i].create_time,
                        user_money:get_thousand_num(res.data.data[i].user_money),
                        recharge_amount_all:get_thousand_num(res.data.data[i].summary_info.recharge_amount_all),
                        profit_amount_all:get_thousand_num(res.data.data[i].summary_info. profit_amount_all),
                        // profit_rate_remain:res.data.data[i].profit_rate_remain,
                        profit_rate_present_for_parent:res.data.data[i].profit_rate_present_for_parent,
                        profit_rate:res.data.data[i].profit_rate

                    }
                    this.state.data.push(model);
                }
                console.log("state data：", this.state.data);
                this.setState({
                    data: this.state.data,
                    pagination
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
    }

    componentDidMount() {
     this.loadData({page:0});
    }

    saveFormRefAddAgent=(ref)=>{
         this.addAgentRef=ref;
    }

    saveFormRefProfitRate=(ref)=>{
        this.addProfitRef=ref;
    }

    setModalVisibleProfitRate=(modalVisibleByProfitRate)=>{
        this.setState({modalVisibleByProfitRate})
    }

    setModalVisibleAddAgent=(modalVisibleByAddAgent)=>{
         this.setState({modalVisibleByAddAgent})
    }

    addAgent=(e)=>{
        e.preventDefault();
        this.addAgentRef.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values:",values);
                agent_add({
                    username: values.username,
                    password: values.password,
                    user_tel:values.user_tel,
                    profit_rate_present_for_parent:values.profit_rate_present_for_parent,
                    wechat_no:values.wechat_no,
                    qq_no:values.qq_no})
                    .then(res=>{
                    if(res.message=='success'&&res.code==0){
                        message.success("下级代理添加成功！");
                        this.setModalVisibleAddAgent(false);
                        this.loadData({page: 0});
                    }else{
                        message.error("添加失败！"+res.data.message);
                    }

                }).catch(err=>{
                    console.log("err:",err);
                })
            }
        }
        )
    }

    updateProfitRate=(e)=>{
        e.preventDefault();
        this.addProfitRef.props.form.validateFields((err, values) => {
                if (!err) {
                    console.log("values:",values);
                    update_agent_profit_rate({id:this.state.selectId,
                        profit_rate_present_for_parent:values.profit_rate_present_for_parent})
                        .then(res=>{
                            if(res.message=='success'&&res.code==0){
                                message.success("修改成功！");
                                this.setModalVisibleProfitRate(false);
                                this.loadData({page: 0});
                            }else{
                                message.error("修改失败！"+res.data.message);
                            }
                    }).catch(err=>{

                    })
                }
            }
        )
    }


    render() {
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
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="用户管理" second="代理信息" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="代理信息" bordered={false}>
                                <Button type="primary" icon="plus" onClick={()=>{

                                    this.addAgentRef.props.form.setFieldsValue({
                                        username:"",
                                        password:""
                                    });
                                    this.setModalVisibleAddAgent(true)
                                }
                                }>
                                    新增
                                </Button>

                                <Button type="primary" onClick={()=>{
                                    this.addProfitRef.props.form.setFieldsValue({
                                        profit_rate_present_for_parent: "",
                                    });
                                    if(this.state.selectedRowKeys.length==0){
                                        message.info("请选择一名代理更改！")
                                    }else if(this.state.selectedRowKeys.length==1){
                                        this.setState({selectId:this.state.data[this.state.selectedRowKeys[0]].id
                                        })
                                        this.addProfitRef.props.form.setFieldsValue({
                                            profit_rate_present_for_parent: this.state.data[this.state.selectedRowKeys[0]].profit_rate_present_for_parent,
                                        });
                                        this.setModalVisibleProfitRate(true)
                                    }else{
                                         message.info("请选择一名代理更改！")
                                        this.setState({selectId:0})
                                    }

                                }
                                }>
                                    修改分成比例
                                </Button>
                                <Table
                                    className="margin_bottom_50"
                                    rowSelection={rowSelection}
                                       columns={this.state.columns}
                                       dataSource={this.state.data}
                                       pagination={this.state.pagination}
                                       onChange={this.handleTableChange}
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>

                <UpdateProfitRateForm
                    wrappedComponentRef={this.saveFormRefProfitRate}
                    visible={this.state.modalVisibleByProfitRate}
                    onCancel={this.setModalVisibleProfitRate.bind(this,false)}
                    onCreate={this.updateProfitRate}
                />
                <AddAgentForm
                    wrappedComponentRef={this.saveFormRefAddAgent}
                    visible={this.state.modalVisibleByAddAgent}
                    onCancel={this.setModalVisibleAddAgent.bind(this,false)}
                    onCreate={this.addAgent}
                />
            </div>

        );
    }
}


export default MyAgentListTable;