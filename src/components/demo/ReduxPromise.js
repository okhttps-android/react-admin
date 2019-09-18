import React from 'react';
import {connect} from "react-redux";
import {asynDataPromise} from "../../action/index";
import {Button} from "antd";
import {asynDataPromiseAction} from "../../action/promise/index";

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
        const {page={},getAsynData}=this.props;
        return <div>
            <Button type={'primary'}  onClick={getAsynData} > 执行异步任务-Promise </Button>
            {JSON.stringify(page)}
        </div>
    }
}



let mapStateToProps = (state) => ({
    page:state,
})

let mapDispatchToProps = (dispatch) => ({
    getAsynData:()=>{
        dispatch(asynDataPromiseAction());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxPromise)