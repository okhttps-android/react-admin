import React from 'react';
import {connect} from "react-redux";
import  T from '../../action/test/index'
import {Button} from "antd";
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
        const  {getTestList,testList={}}=this.props;
        console.log("render()",this.props);
        return <div>
            <Button type={'primary'}  onClick={getTestList}> getTestList </Button>

            <div>
                {JSON.stringify(testList)}
            </div>
        </div>
    }
}


let mapStateToProps = (state) => ({
    testList: state.testData,
})

let mapDispatchToProps = (dispatch) => ({
      getTestList:()=>{
          dispatch(T.getTestList());
      }
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxActions)