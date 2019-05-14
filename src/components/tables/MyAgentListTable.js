import React from 'react';
import {Toast} from "antd-mobile";
import {get_agent_list, limit} from "../../http";
import {Card, Col, Row, Table} from "antd";
import BreadcrumbCustom from "../BreadcrumbCustom";



class MyAgentListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'MyUserListTable',
            selectedRowKeys: [],
            pageSize: 0,
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


    componentDidMount() {
        Toast.loading("")
        this.state.pageSize = 0;
        get_agent_list({limit: limit, offset: this.state.pageSize})
            .then(res => {
                Toast.hide()
                console.log("result:", res.data, res.data.data.length);
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].subordinate_agent.id + "",
                        nick_name: res.data.data[i].subordinate_agent.username,
                        create_time: res.data.data[i].subordinate_agent.create_time,
                        user_money:res.data.data[i].subordinate_agent.user_money,
                        recharge_amount_all:res.data.data[i].recharge_amount_all,
                        profit_amount_all:res.data.data[i]. profit_amount_all,
                        // profit_rate_remain:res.data.data[i].profit_rate_remain,
                        profit_rate_present_for_parent:res.data.data[i].subordinate_agent.profit_rate_present_for_parent,
                        profit_rate:res.data.data[i].subordinate_agent.profit_rate

                    }
                    this.state.data.push(model);
                }
                console.log("state data：", this.state.data);
                this.setState({
                    data: this.state.data
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
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
                                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}


export default MyAgentListTable;