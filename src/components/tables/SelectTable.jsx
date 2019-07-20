/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table } from 'antd';
import {get_account_list} from '../../http/index'
import {Toast} from "antd-mobile";

let limit=10;
class SelectTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            pageSize:0,
            pagination: {
                showQuickJumper:true,
                showSizeChanger:true,
                onShowSizeChange:this.onShowSizeChange.bind(this),
                showTotal:(total)=>(`共 ${total} 条`),
                pageSizeOptions:[
                    '10','20','30','40','50'
                ]},
            columns : [{
                title: 'APP账号ID',
                dataIndex: 'id',
            }, {
                title: '昵称',
                dataIndex: 'nick_name',
            }, {
                title: 'APP账号手机号',
                dataIndex: 'user_tel',
            },{
                title: '绑定时间',
                dataIndex: 'create_time',
            }
            ],
            data:[]
        };
    }


    onShowSizeChange=(current,size)=>{
        //console.log("onShowSizeChange() current:",current,"size:",size);
        limit=size;
    }
    onSelectChange = (selectedRowKeys) => {

        this.setState({ selectedRowKeys });
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
        get_account_list({limit:limit,offset:params.pages})
            .then(res=>{
                const pagination = {...this.state.pagination};
                pagination.total = res.data.count;
                Toast.hide()
                this.state.data=[];
                for (let i=0;i<res.data.data.length;i++){
                    let model={
                        id:res.data.data[i].user.id+"",
                        nick_name:res.data.data[i].user.nick_name,
                        user_tel:res.data.data[i].user.user_tel,
                        create_time:res.data.data[i].user.create_time,

                    }
                    this.state.data.push(model);
                }
                //console.log("state data：",this.state.data);
                this.setState({
                    data: this.state.data,
                    pagination
                })

            }).catch(err => {
            Toast.hide()
            //console.log("err:",err);
        })
    }

    componentDidMount(){
       this.props.onRef(this);
        this.loadData({page:0});

    }


    render() {
        const { selectedRowKeys } = this.state;
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
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
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
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };
        return (
            <Table
                   className="margin_bottom_50"
                   rowSelection={rowSelection}
                   columns={this.state.columns}
                   dataSource={this.state.data}
                   pagination={this.state.pagination}
                   onChange={this.handleTableChange}
            />
        );
    }
}

export default SelectTable;