import React from 'react';
import {get_withdaw_list, get_withdraw_request_list, limit} from "../../http";
import {Toast} from "antd-mobile";
import {Row, Col, Button,Card} from 'antd';
import {connectAlita} from "redux-alita";
import BreadcrumbCustom from "../BreadcrumbCustom";
import '../../style/css/app-gloal.css'
class WithDrawAccountTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'提现账号',
            selectedRowKeys: [],
            data: [],
            pagination: {showQuickJumper:true},
            columns:[ {
                title: '账号类型',
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
    
    
    componentDidMount(){
        this.loadData({page: 0});
    }

    loadData=(params={})=> {
        const { setAlitaState } = this.props;
        Toast.loading("")
        get_withdaw_list({limit: limit, offset: params.page*limit})
            .then(res => {
                console.log("result:"+JSON.stringify(res.data));
                setAlitaState({ stateName: 'moneyAccount', data: res.data.data });
                this.setState({
                    data: this.state.data
                })

            }).catch(err => {
            Toast.hide()
            console.log("err:", err);
        })
    }

    render(){
        return <div className="gutter-example">
            <BreadcrumbCustom first="提现管理" second="提现账号"/>
            <Row>
                <Col span={24}>
                    <Card>
                        <div><span className='span_19'>银行账户</span> <Button size={"small"}>修改</Button></div>
                        <div>银行账户：</div>
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div><span className='span_19'>支付宝账户 </span><Button size={"small"}>修改</Button></div>
                        <div>支付宝账户：</div>
                    </Card>

                </Col>
                <Col span={24}>
                    <Card>
                        <div>
                            <span className='span_19'>微信账户</span>
                            <Button size={"small"}>修改</Button>
                        </div>
                    <div>支付宝账户：</div>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export  default connectAlita(['auth','moneyAccount'])(WithDrawAccountTable);