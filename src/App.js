import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
import { connectAlita } from 'redux-alita';
import {Redirect} from "react-router-dom";
import {user_info} from "./http/index";
import {message} from 'antd'

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        title: '',
        user:{}
    };

    componentWillMount() {
        const { setAlitaState } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        user && setAlitaState({ stateName: 'auth', data: user });
        this.getClientWidth();
        window.onresize = () => {
            //console.log('屏幕变化了');
            this.getClientWidth();
        }
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user!=null){
            const { setAlitaState } = this.props;
            setAlitaState({funcName:'user_info',stateName:'userData'});
        }

        const openNotification = () => {
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const { setAlitaState } = this.props;
        const clientWidth = window.innerWidth;
        //console.log(clientWidth);
        setAlitaState({ stateName: 'responsive', data: { isMobile: clientWidth <= 992 } });
        // receiveData({isMobile: clientWidth <= 992}, 'responsive');

    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        const { title } = this.state;
        const { auth = { data: {} }, responsive = { data: {} },userInfo={data:{}} } = this.props;
        if (auth==null){
           // message.info("重定向登录界面！12")
           return <Redirect to={'/login'} />;
        }
        if (auth.data==null){
          // message.info("重定向登录界面！")
            return <Redirect to={'/login'} />;
        }
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                    <ThemePicker />
                    <Layout style={{flexDirection: 'column'}}>
                        <HeaderCustom toggle={this.toggle}
                                      collapsed={this.state.collapsed}/>
                        <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                            <Routes auth={auth} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                        代理后台管理系统©{new Date().getFullYear()} Created by React
                        </Footer>
                    </Layout>
                </Layout>
            </DocumentTitle>
        );
    }
}

export default connectAlita(['auth', 'responsive','userInfo',"userData"])(App);

