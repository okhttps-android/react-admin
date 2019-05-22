import React from 'react';
import {Toast} from "antd-mobile";
import {get_agent_list, agent_add,update_agent_profit_rate,limit} from "../../http";
import {Button, Card, Col, Row, Table,message} from "antd";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {get_thousand_num} from "../../utils/index";
import UpdateProfitRateForm from "../forms/UpdateProfitRateForm";
import AddAgentForm from "../forms/AddAgentForm";



class MyAgentListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'MyUserListTable',
            selectedRowKeys: [],
            modalVisibleByProfitRate:false,
            modalVisibleByAddAgent:false,
            pagination: {showQuickJumper:true},
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
                        id: res.data.data[i].subordinate_agent.id + "",
                        nick_name: res.data.data[i].subordinate_agent.username,
                        create_time: res.data.data[i].subordinate_agent.create_time,
                        user_money:get_thousand_num(res.data.data[i].subordinate_agent.user_money),
                        recharge_amount_all:get_thousand_num(res.data.data[i].recharge_amount_all),
                        profit_amount_all:get_thousand_num(res.data.data[i]. profit_amount_all),
                        // profit_rate_remain:res.data.data[i].profit_rate_remain,
                        profit_rate_present_for_parent:res.data.data[i].subordinate_agent.profit_rate_present_for_parent,
                        profit_rate:res.data.data[i].subordinate_agent.profit_rate

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
                                    this.setModalVisibleAddAgent(true)
                                }
                                }>
                                    新增
                                </Button>

                                <Button type="primary" onClick={()=>{
                                    this.setModalVisibleProfitRate(true)
                                }
                                }>
                                    修改分成比例
                                </Button>
                                <Table rowSelection={rowSelection}
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