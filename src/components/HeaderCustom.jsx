/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, {Component} from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import {Menu, Icon, Layout, Badge, Popover, message} from 'antd';
import {gitOauthToken, gitOauthInfo} from '../axios';
import {queryString} from '../utils';
import {withRouter} from 'react-router-dom';
import {PwaInstaller} from './widget';
import {connectAlita} from 'redux-alita';
import {user_logout} from "../http/index";
import UpdateUserPasswordForm from "./forms/UpdateUserPasswordForm";
import {get_sms_code, update_withdraw_password, update_user_password} from "../http";
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        user_tel: null,
        modalVisibleByWithDrawPassword: false,
    };

    componentDidMount() {
        const QueryString = queryString();
        const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        if (!_user && QueryString.hasOwnProperty('code')) {
            gitOauthToken(QueryString.code).then(res => {
                gitOauthInfo(res.access_token).then(info => {
                    this.setState({
                        user: info
                    });
                    localStorage.setItem('user', JSON.stringify(info));
                });
            });
        } else {
            this.setState({
                user: _user
            });
        }
    };

    saveFormRefWithDrawPassword = formRef => {
        this.formRefWithDrawPassword = formRef;
    };


    sendMsg = () => {
        this.formRefWithDrawPassword.props.form.validateFields((err, values) => {
            let user_tel = values.user_tel;
            console.log("user_tel:", user_tel);
            if (user_tel != null && user_tel != "" && user_tel != " ") {
                this.child.countDown();
                get_sms_code({user_tel: this.state.user_tel, auth_type: 1}).then(res => {
                    console.log("get_sms_code result()", res.data);
                }).catch(err => {
                    console.log(err)
                })
            }
        });

    }

    onChangeInputByPhone = (e) => {
        console.log("onChangeInputByPhone():", e.target.value);
        this.state.user_tel = e.target.value;
        this.setState({user_tel: e.target.value})
    }

    onRefBindSMSCode = (ref) => {
        this.child = ref
    }


    setModalVisibleWithDrawPassword(modalVisibleByWithDrawPassword) {
        this.setState({modalVisibleByWithDrawPassword});
    }

    updateWithDrawPassword = (e) => {
        e.preventDefault();
        this.formRefWithDrawPassword.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("tel ()", values.user_tel);
                console.log("tel ()", values.password);
                console.log("tel ()", values.code);
                update_user_password({
                    user_tel: values.user_tel,
                    password: values.password,
                    code: values.code
                })
                    .then(res => {
                        console.log("result()", res);
                        if (res.message == 'success' && res.code == 0) {
                            message.success("登录密码修改成功！");
                            this.setModalVisibleWithDrawPassword(false);
                        } else {
                            message.error("修改失败！" + res.data.message);
                        }
                    }).catch(err => {
                    console.log(err)
                })
            }
        })
    }

    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        // e.key === 'logout' && this.logout();
    };

    logout = () => {
        user_logout().then(res => {
            localStorage.removeItem('user');
            this.props.history.push('/login')
        })
    };

    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({visible});
    };

    render() {
        const {responsive = {data: {}}, path} = this.props;
        console.log("render() 用户信息 user:", this.props.user);
        const {agent = {agent: {}}} = this.props.user;
        return (
            <Header className="custom-theme header ">
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide}/>} trigger="click"
                                 placement="bottomLeft" visible={this.state.visible}
                                 onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger"/>
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }

                <Menu
                    mode="horizontal"

                    style={{lineHeight: '64px', float: 'right'}}
                    onClick={this.menuClick}
                >

                    <Menu.Item key="userInfo">
                        <div className=" flex">
                            <span className="span_16">【{agent.agent_level}级代理】</span>
                            <span className="span_14">{agent.username}</span>
                        </div>
                    </Menu.Item>
                    {/*  <Menu.Item key="full" onClick={this.screenFull} >
                     <Icon type="arrows-alt" onClick={this.screenFull} />
                     </Menu.Item>*/}
                    {/*      <Menu.Item key="1">
                     <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                     <Icon type="notification" />
                     </Badge>
                     </Menu.Item>*/}
                    <SubMenu title={<span className="avatar"><img
                        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1361467273,3482588863&fm=27&gp=0.jpg"
                        alt="头像"/><i className="on bottom b-white"/></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {agent.username}</Menu.Item>
                            <Menu.Item key="setting:2" onClick={()=>{
                                this.props.history.push('/app/userInfo')
                            }}>个人信息</Menu.Item>
                            <Menu.Item key="logout" onClick={this.logout}><span >退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3" onClick={() => {
                                this.setModalVisibleWithDrawPassword(true);
                            }}><span >修改密码</span></Menu.Item>
                            {/*  <Menu.Item key="setting:4">系统设置</Menu.Item>*/}
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
                {/**/}
                <UpdateUserPasswordForm
                    wrappedComponentRef={this.saveFormRefWithDrawPassword}
                    visible={this.state.modalVisibleByWithDrawPassword}
                    sendMsg={this.sendMsg}
                    phone={this.state.user_tel}
                    onChangeInputByPhone={this.onChangeInputByPhone}
                    onRefBindSMSCode={this.onRefBindSMSCode}
                    onCancel={this.setModalVisibleWithDrawPassword.bind(this, false)}
                    onCreate={this.updateWithDrawPassword}
                />`
            </Header>
        )
    }
}

export default withRouter(connectAlita(['responsive', "auth"])(HeaderCustom));
