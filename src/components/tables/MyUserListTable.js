import React from 'react';
import {Toast} from "antd-mobile";
import {get_client_list, limit} from "../../http";
import {Card, Col, Row, Table} from "antd";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {get_thousand_num} from "../../utils/index";

class MyUserListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'MyUserListTable',
            selectedRowKeys: [],
            pagination: {showQuickJumper:true},
            data: [],
            columns: [{
                title: 'APP账号ID',
                dataIndex: 'id',
            }, {
                title: '昵称',
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
                title: '当前代理分成(%)',
                dataIndex: 'profit_rate_remain',
            }, {
                title: '注册时间',
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
        get_client_list({limit: limit, offset: params.page})
            .then(res => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].user.id + "",
                        nick_name: res.data.data[i].user.nick_name,
                        create_time: res.data.data[i].user.create_time,
                        user_money:get_thousand_num(res.data.data[i].user.user_money),
                        recharge_amount_all:get_thousand_num(res.data.data[i].recharge_amount_all),
                        profit_amount_all:get_thousand_num(res.data.data[i]. profit_amount_all),
                        profit_rate_remain:res.data.data[i].profit_rate_remain
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
                <BreadcrumbCustom first="用户管理" second="用户列表" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="用户列表" bordered={false}>
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
            </div>

        );
    }
}


export default MyUserListTable;