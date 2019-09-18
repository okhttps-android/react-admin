import React from 'react';
import {connect} from "react-redux";
import  T from '../../action/test/index'
import {Button} from "antd";

/*练习Redux-Actions的使用*/
class ReduxActions extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ReduxActions'
        };
    }


    componentDidMount(){

    }

    render(){
        const  {getListTest,testList={},testDelete}=this.props;
        console.log("render()",this.props);
        return <div>
            <Button type={'primary'}  onClick={getListTest}> getListTest </Button>
            <Button type={'primary'}  onClick={()=>{
                testDelete("2");
            }}> 删除item2</Button>
            <div>
                {JSON.stringify(testList)}
            </div>
        </div>
    }
}


let mapStateToProps = (state) => ({
    testList: state.testData,
})

// let mapDispatchToProps = (dispatch) => ({
//       getTestList:()=>{
//          // dispatch(T.getTestList());
//           dispatch(T.actions.getListTest);
//       },
//       testDelete:()=>{
//           dispatch(T.actions.testDelete);
//       }
//
// })

let mapDispatchToProps ={
    getListTest:T.actions.getListTest,
    testDelete:T.actions.testDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxActions)