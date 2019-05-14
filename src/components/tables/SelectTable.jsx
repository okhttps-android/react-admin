/**
 * Created by hao.cheng on 2017/4/15.
 */
import React from 'react';
import { Table } from 'antd';
import {get_account_list,limit} from '../../http/index'
import {Toast} from "antd-mobile";

const columns = [{
    title: 'Name',
    dataIndex: 'name',
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

class SelectTable extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        pageSize:0
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
              console.log("result:",res.data);
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
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        );
    }
}

export default SelectTable;