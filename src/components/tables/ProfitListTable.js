import React from 'react';
import {Toast} from "antd-mobile";
import {get_profit_list} from "../../http";
import BreadcrumbCustom from "../BreadcrumbCustom";
import {Card, Col, Row, Table} from "antd";
import {withRouter } from 'react-router';
import {get_thousand_num} from "../../utils/index";

let limit=10;

class ProfitListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            data: [],
            pagination: {
                showQuickJumper:true,
                showSizeChanger:true,
                onShowSizeChange:this.onShowSizeChange.bind(this),
                showTotal:(total)=>(`共 ${total} 条`),
                pageSizeOptions:[
                    '10','20','30','40','50'
                ]},
            columns: [{
                title: '日期',
                dataIndex: 'create_date',
                render: (text, record) => <a onClick={()=>{
                    this.props.history.push('/app/money/day?day='+record.create_date);
                }} style={{color:"blue",textDecoration:"underline"}}>{text}</a>,
            }, {
                title: '总佣金',
                dataIndex: 'profit_amount_all',
            }, {
                title: '直系佣金',
                dataIndex: 'profit_amount_from_friend',
            }, {
                title: '二级佣金',
                dataIndex: 'profit_amount_from_subordinate_1',
            }
            , {
                title: '三级佣金',
                dataIndex: 'profit_amount_from_subordinate_2',
            }

            ]
        };
    }
    onShowSizeChange=(current,size)=>{
        //console.log("onShowSizeChange() current:",current,"size:",size);
        limit=size;
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({pagination: pager,});
        this.loadData({page: pagination.current-1,});
    };

    componentDidMount() {
        this.loadData({page: 0});
    }

    loadData=(params={})=> {
        Toast.loading("")
        get_profit_list({limit: limit, offset: params.page*limit})
            .then(res => {
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i = 0; i < res.data.data.length; i++) {
                    let model = {
                        create_date: res.data.data[i].create_date + "",
                        profit_amount_all:  get_thousand_num(res.data.data[i].profit_amount_all),
                        profit_amount_from_friend: get_thousand_num(res.data.data[i].profit_amount_from_friends) ,
                        profit_amount_from_subordinate_1: get_thousand_num(res.data.data[i].profit_amount_from_subordinate_1),
                        profit_amount_from_subordinate_2: get_thousand_num(res.data.data[i].profit_amount_from_subordinate_2)

                    }
                    this.state.data.push(model);
                }
                this.setState({
                    data: this.state.data,
                    pagination
                })

            }).catch(err => {
            Toast.hide()
            //console.log("err:", err);
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
                <BreadcrumbCustom first="收益管理" second="收益统计"/>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="收益统计" bordered={false}>
                                <Table rowSelection={rowSelection}
                                       className="margin_bottom_50"
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

export default withRouter(ProfitListTable);