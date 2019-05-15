import React from 'react';

import {Toast} from "antd-mobile";
import {get_profit_detail_list, limit} from "../../http";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Card, Col, Row, Table} from "antd";
/**
 * Created by Arison on 1:05.
 */
class ProfitDetailTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pageSize: 0,
            data: [],
            columns: [{
                title: 'ID',
                dataIndex: 'id',
            },{
                title: '创建日期',
                dataIndex: 'create_date',
            }, {
                title: '佣金',
                dataIndex: 'profit_amount',
            }, {
                title: '佣金比例（%）',
                dataIndex: 'profit_rate_remain',
            }, {
                title: '充值金额',
                dataIndex: 'recharge_amount',
            }
            , {
                title: '充值玩家APP ID',
                dataIndex: 'user_id',
            }
            , {
                title: '充值玩家昵称',
                dataIndex: 'user_nick_name',
            }
            ]
        };
    }


    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };


    componentDidMount() {
        const { query } = this.props;
        Toast.loading("")
        this.state.pageSize =0;
       console.log("componentDidMount() query.day:",query.day);
        get_profit_detail_list({limit: limit, offset: this.state.pageSize,create_date:query.day})
            .then(res => {
                Toast.hide()
                console.log("result:", res.data, res.data.data.length);
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        id: res.data.data[i].id + "",
                        create_date: res.data.data[i].create_time,
                        recharge_amount: res.data.data[i].recharge_amount,
                        profit_rate_remain: res.data.data[i].profit_rate_remain,
                        profit_amount: res.data.data[i].profit_amount,
                        user_id: res.data.data[i].user.id,
                        user_nick_name: res.data.data[i].user.nick_name
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
                <BreadcrumbCustom first="收益管理" second="收益统计-明细"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="收益统计-明细" bordered={false}>
                                <Table rowSelection={rowSelection} columns={this.state.columns}
                                       dataSource={this.state.data}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>

        );
    }
}

export  default ProfitDetailTable;