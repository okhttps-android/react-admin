import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Page from './Page';
import * as apis from './http';
import { AppContainer } from 'react-hot-loader';
import { AlitaProvider, setConfig } from 'redux-alita';
import {LocaleProvider} from "antd";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import './style/lib/animate.css';
import './style/antd/index.less';
import './style/index.less';
import {Provider} from "react-redux";
import {createStore} from 'redux'
import reducers from './reducer/index'
const store = createStore(reducers)
// setConfig(apis);

ReactDOM.render(
     <Provider store={store}>
         <Page/>
     </Provider>,
  document.getElementById('root')
);

serviceWorker.register();


