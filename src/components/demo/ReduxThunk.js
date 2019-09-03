import React from 'react';
import {Button} from "antd";
import {connect} from 'react-redux'
import {asynData, delayAdd, receiveData, requestData} from "../../action/index";
import {objectIsNull} from "../../utils/index";

class ReduxThunk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReduxThunk'
        };
    }

    render() {
        const {startAsyn1, startAsyn2,appState={}} = this.props;
        console.log("render()", this.props);
        let data="";
        let isLoad;
        console.log("render() appState=",appState);
        data =appState.data;
        isLoad=appState.isFetching;
        return <div>
            <Button
                style={{margin: "10px"}}
                type={'primary'}
                onClick={() => {
                    startAsyn1();
                }}> 执行异步请求1</Button>

            <Button
                style={{margin: "10px"}}
                type={'primary'}
                onClick={startAsyn2}> 执行异步请求2</Button>

            <div>
                httpData:{JSON.stringify(data)}
                {isLoad?(<div>数据加载中</div>):(<div>数据加载完毕！</div>)}

            </div>

            <div>
                <div> objectIsNull("")={objectIsNull("")}</div>
                <div> objectIsNull("{}")={objectIsNull("{}")}</div>
                <div> undefined:{objectIsNull(undefined)}</div>
                <div> false:{objectIsNull(false)}</div>
                <div> true:{objectIsNull(true)}</div>
                <div> null:{objectIsNull(null)}</div>
                <div> " ":{objectIsNull(" ")}</div>
                <div> "{}":{objectIsNull({})}</div>
                <div></div>








            </div>
        </div>
    }
}

let mapStateToProps = (state) => ({
    appState: state.httpData.appState
})

let mapDispatchToProps = (dispatch) => ({
    startAsyn1: () => {
        console.log("startAsyn1()");
        //dispatch(asynData);
        dispatch(asynData());
    },
    startAsyn2: () => {
        console.log("startAsyn2()");
        dispatch(asynData());
        // dispatch(receiveData({
        //     name:"arison",
        //     age:"12",
        //     sex:"男"
        // },"appState"));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxThunk)