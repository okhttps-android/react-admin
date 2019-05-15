/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table } from 'antd';
import {get_account_list,limit} from '../../http/index'
import {Toast} from "antd-mobile";

const columns = [{
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
];


class SelectTable extends React.Component {
    state = {
        selectedRowKeys: [],
        pageSize:0,
        data:[]
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    componentDidMount(){
        Toast.loading("")
        this.state.pageSize=0;
        get_account_list({limit:limit,offset:this.state.pageSize})
            .then(res=>{
                Toast.hide()
              console.log("result:",res.data,res.data.data.length);
                for (let i=0;i<res.data.data.length;i++){
                    let model={
                        id:res.data.data[i].user.id+"",
                        nick_name:res.data.data[i].user.nick_name,
                        user_tel:res.data.data[i].user.user_tel,
                        create_time:res.data.data[i].user.create_time,

                    }
                    this.state.data.push(model);
                }
                console.log("state data：",this.state.data);
                this.setState({
                    data: this.state.data
                })

        }).catch(err => {
            Toast.hide()
            console.log("err:",err);
        })
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} />
        );
    }
}

export default SelectTable;