import React, { Component } from 'react';
import Routes from './routes';
import DocumentTitle from 'react-document-title';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout, notification, Icon } from 'antd';
import { ThemePicker } from './components/widget';
import { connectAlita } from 'redux-alita';
import {Redirect} from "react-router-dom";

const { Content, Footer } = Layout;

class App extends Component {
    state = {
        collapsed: false,
        title: ''
    };

    componentWillMount() {
        const { setAlitaState } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        // user && receiveData(user, 'auth');
        user && setAlitaState({ stateName: 'auth', data: user });
        //noinspection JSAnnotator
        setAlitaState({stateName:'userInfo',data:{'name':'liujie','sex':'男'}});
        // receiveData({a: 213}, 'auth');
        // fetchData({funcName: 'admin', stateName: 'auth'});
        this.getClientWidth();
        window.onresize = () => {
            console.log('屏幕变化了');
            this.getClientWidth();
        }
    }
    componentDidMount() {
        const openNotification = () => {
            // notification.open({
            //   message: '',
            //   description: (
            //       <div>
            //
            //       </div>
            //   ),
            //   icon: <Icon type="smile-circle" style={{ color: 'red' }} />,
            //   duration: 0,
            // });
            localStorage.setItem('isFirst', JSON.stringify(true));
        };
        const isFirst = JSON.parse(localStorage.getItem('isFirst'));
        !isFirst && openNotification();
    }
    getClientWidth = () => { // 获取当前浏览器宽度并设置responsive管理响应式
        const { setAlitaState } = this.props;
        const clientWidth = window.innerWidth;
        console.log(clientWidth);
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
            return <Redirect to={'/login'} />;
        }
        if (auth.data==null){
            return <Redirect to={'/login'} />;
        }
        return (
            <DocumentTitle title={title}>
                <Layout>
                    {!responsive.data.isMobile && <SiderCustom collapsed={this.state.collapsed} />}
                    <ThemePicker />
                    <Layout style={{flexDirection: 'column'}}>
                        <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed} user={auth.data.data || {}} />
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

export default connectAlita(['auth', 'responsive','userInfo'])(App);
