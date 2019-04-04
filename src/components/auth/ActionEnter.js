/**
 * Created by Arison on 2019/4/3.
 */
import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import AuthWidget from '@/components/widget/AuthWidget';
const SubMenu = Menu.SubMenu;


class ActionEnter extends React.Component{

    constructor(props){
        super(props);
    }
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    componentWillMount(){
        console.log("componentWillMount()");
        //获取问号参数
        const reg = /\?\S*/g;
        const queryParams = window.location.hash.match(reg);
        console.log("componentWillMount()  问号参数：",queryParams);


    }

    componentDidMount=()=>{
        console.log("componentDidMount()");
        console.log("componentWillMount() props参数 name：",this.props.match.params.name);
        console.log("componentWillMount() props参数：age：",this.props.match.params.age);
    }
    

    render() {
        return (
            <div style={{ width: 256 }}>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="inbox" />
                        <span>Option 3</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
}

export  default ActionEnter;