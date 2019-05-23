import React from 'react';
import { connectAlita } from 'redux-alita';
import BreadcrumbCustom from "./BreadcrumbCustom";
import {Card, Col, Row} from "antd";

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
            console.log("render() userInfo:",userInfo);
        return <div>
            <BreadcrumbCustom first="用户信息" />
            <Row>
                <Col span={24}>
                    <Card>
                        {userInfo.data!=null?(<div>
                            <div><span className="span_16  margin_right_10 text_color_gray">  &nbsp;&nbsp; &nbsp;用户名:</span>{userInfo.data.data.agent.username} </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">代理级别:</span>{userInfo.data.data.agent.agent_level}级代理 </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">  &nbsp;&nbsp;&nbsp;手机号:</span>{userInfo.data.data.agent.user_tel} </div>
                            <div><span className="span_16  margin_right_10 text_color_gray">创建时间:</span>{userInfo.data.data.agent.create_time} </div>
                        </div>):(<div></div>)}

                    </Card>
                </Col>
            </Row>
        </div>
    }
}

export  default  connectAlita(['auth'])(UserInfoPage);