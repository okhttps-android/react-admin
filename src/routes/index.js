/**
 * Created by 叶子 on 2017/8/13.
 */
import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import AllComponents from '../components';
import routesConfig from './config';
import queryString from 'query-string';
import NotFound from "../components/pages/NotFound";

export default class CRouter extends Component {

    requireAuth = (permission, component) => {
        const {auth} = this.props;
        const {permissions} = auth.data;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'}/>;
        return component;
    };
    requireLogin = (component, permission) => {
        let user = localStorage.getItem("user");
        console.log("user:", user);
        if (user != null) {
            return permission ? this.requireAuth(permission, component) : component;
        } else {
            return <Redirect to={'/login'}/>;
        }
    };

    render() {
        return (
            <Switch>
                {
                    Object.keys(routesConfig).map(key => {
                            //遍历对象下第一次数组对象:menus[],others[]
                            return routesConfig[key].map(r => {


                                const route = r => {
                                    const Component = AllComponents[r.component];
                                    return (
                                        <Route
                                            key={r.route || r.key}
                                            exact
                                            path={(r.route || r.key) + (r.param || '')}
                                            render={props => {
                                                const reg = /\?\S*/g;
                                                // 匹配?及其以后字符串
                                                const queryParams = window.location.hash.match(reg);
                                                // 去除?的参数
                                                const {params} = props.match;
                                                Object.keys(params).forEach(key => {
                                                    params[key] = params[key] && params[key].replace(reg, '');
                                                });
                                                props.match.params = {...params};
                                                const merge = {
                                                    ...props,
                                                    query: queryParams ? queryString.parse(queryParams[0]) : {}
                                                };
                                                // 重新包装组件
                                                const wrappedComponent = (
                                                    <DocumentTitle title={r.title}>
                                                        <Component {...merge} />
                                                    </DocumentTitle>
                                                )
                                                return false
                                                    ? wrappedComponent
                                                    : this.requireLogin(wrappedComponent, r.auth)
                                            }}
                                        />
                                    )
                                }
                                return r.component ? route(r) : r.subs.map(r => route(r));
                            })


                        }
                    )
                }

                <Route exact
                       path={"/app/userInfo"} component={AllComponents["UserInfoPage"]}/>
                <Route component={NotFound}/>
                <Route render={() => <Redirect to="/app/404"/>}/>
            </Switch>
        )
    }
}