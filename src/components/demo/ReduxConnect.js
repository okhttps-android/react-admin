/**
 * Created by Arison on 2019/9/20.
 */
import React from 'react';
import {connect} from "react-redux";
import {asynData} from "../../action/index";
import {Button} from "antd";

let mapStateToProps = (state) => ({
    appState: state
})

let mapDispatchToProps = (dispatch) => ({
    getTestList: () => {
        dispatch(asynData());
    }
})

@connect(
    state=>({appState:state}),
    dispatch=>({
        getTestList: () => {
        dispatch(asynData());
    }})
   )
export default class ReduxConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReduxConnect'
        };
    }


    render() {
        const {getTestList, appState} = this.props;
        return <div>
            <Button type={'primary'} onClick={getTestList}> 获取测试数据 </Button>
            <div>{JSON.stringify(appState)}</div>
        </div>
    }
}

