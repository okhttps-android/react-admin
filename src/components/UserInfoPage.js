import React from 'react';
import { connectAlita } from 'redux-alita';
import BreadcrumbCustom from "./BreadcrumbCustom";
import {Card, Col, Row} from "antd";
import {get_thousand_num} from "../utils/index";

class UserInfoPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'UserInfoPage'
        };
    }
    
    
    componentDidMount(){

    }
   
    render(){
        const {auth:userInfo={}}=this.props
            //console.log("render() userInfo:",userInfo);
        let agent={};
        if (this.props.userData!=null){
            if(this.props.userData.data!=null){
                if(!this.props.userData.isFetching){
                    agent = this.props.userData.data.data;
                }
            }
        }
        return <div>
            <BreadcrumbCustom first="用户信息" />
            <Row>
                <Col span={24}>
                    <Card>
                        {agent!=null?(<div>
                            <div><span className="span_16  margin_right_10 text_color_gray">  &nbsp;&nbsp; &nbsp;用户名:</span>{agent.username} </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">代理级别:</span>{agent.agent_level}级代理 </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">  &nbsp;&nbsp;&nbsp;手机号:</span>{agent.user_tel} </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">创建时间:</span>{agent.create_time} </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;余 额:</span>￥ { get_thousand_num(agent.user_money_all)} </div>
                        </div>):(<div></div>)}

                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export  default  connectAlita(['auth',"userData"])(UserInfoPage);