import React from 'react';
import {Button} from "antd";
import {connect} from 'react-redux'
import {asynData} from "../../action/index";
class ReduxThunk extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ReduxThunk'
        };
    }


    componentDidMount(){

    }

    // startAsynTask1=()=>{
    //
    // }
    // startAsynTask2=()=>{
    //
    // }


    render(){
       console.log("render()",this.props);
        return <div>
                 <Button type={'primary'}
                         onClick={this.props.startAsyn1} block> 执行异步请求1</Button>

            <Button type={'primary'}
                    onClick={this.props.startAsyn2} block> 执行异步请求2</Button>
        </div>
    }
}

let mapStateToProps = (state) => ({
    asynData:state.asynData
})

let mapDispatchToProps = (dispatch) => ({
    startAsyn1:()=>{
        dispatch(asynData);
    },
    startAsyn2:()=>{
        dispatch(asynData);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxThunk)