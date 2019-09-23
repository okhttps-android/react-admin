/**
 * Created by Arison on 2019/9/20.
 */
import React from 'react';
import {connect} from "react-redux";
import {asynData, receiveData, requestData} from "../../action/index";
import {Button} from "antd";
import T from "../../action/test/index";

// let mapStateToProps = (state) => ({
//     appState: state
// })
//
// let mapDispatchToProps = (dispatch) => ({
//     getTestList: () => {
//         dispatch(asynData());
//     },
//     getTestListNew:()=>{
//         dispatch(asynData());
//     }
// })

// @connect(
//     state=>({appState:state}),
//     dispatch=>({
//         getTestList: () => {
//         dispatch(asynData());
//     },
//         getTestListNew:()=>{
//             dispatch(asynData());
//         }
//     })
//    )
// const getTestList=T.getTestList
@connect(state=>(
    {
        appState:state
    }),
    {   requestData,
        asynData,
        receiveData,
        getTestList:(T.getTestList)
        }
)
export default class ReduxConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReduxConnect'
        };
    }


    render() {
        const {getTestList,getTestListNew, receiveData,asynData,appState} = this.props;
        return <div>
            <Button type={'primary'} onClick={asynData}> 获取测试数据1 </Button>
            <Button type={'primary'} onClick={getTestList}> 获取测试数据2 </Button>
            <div>{JSON.stringify(appState)}</div>
        </div>
    }
}

