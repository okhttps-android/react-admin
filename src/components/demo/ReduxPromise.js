import React from 'react';
import {connect} from "react-redux";

import {Button} from "antd";
import {asynDataPromise, asynDataPromiseAction, sendAsynPromise} from "../../action/promise/index";

class ReduxPromise extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ReduxPromise'
        };
    }


    componentDidMount(){

    }

    render(){
        const {page={},getAsynData,getAsynDataAction}=this.props;
        return <div>
            <Button type={'primary'}  onClick={getAsynDataAction} > 执行异步任务1-Promise </Button>
            <Button type={'primary'}  onClick={getAsynData} > 执行异步任务2-Promise </Button>
            {JSON.stringify(page)}
        </div>
    }
}



let mapStateToProps = (state) => ({
    page:state,
})

let mapDispatchToProps = (dispatch) => ({
    getAsynData:()=>{
        console.log("getAsynData()",sendAsynPromise());
        dispatch(sendAsynPromise("test1"));
    },
    getAsynDataAction:()=>{
        console.log("getAsynDataAction()",asynDataPromiseAction());
        dispatch(asynDataPromiseAction());
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPromise)