import React from 'react';
import {Button} from "antd";
import {connect} from 'react-redux'
import {asynData, delayAdd, receiveData, requestData} from "../../action/index";

class ReduxThunk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'ReduxThunk'
        };
    }

    render() {
        const {startAsyn1, startAsyn2} = this.props;
        console.log("render()", this.props);
        let data="";
        let isLoad;
        if(this.props.httpData.httpData!=null){
         if( this.props.httpData.httpData.appState!=null){
             if(this.props.httpData.httpData.appState.data!=null){
                data =this.props.httpData.httpData.appState.data;
                 isLoad=this.props.httpData.httpData.appState.isFetching;
             }
         }
        }
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
        </div>
    }
}

let mapStateToProps = (state) => ({
    httpData: state
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