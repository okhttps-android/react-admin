import React from 'react';
import {Button} from "antd";


//父组件
class ComponentUpdate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ComponentUpdate',
            num:0,
            title:"react study"
        };
        this.handleClick=this.handleClick.bind(this);
        this.handleTitle=this.handleTitle.bind(this);
    }


   handleClick=()=>{
     this.state.num++;
     this.setState({num:this.state.num})

   }

   handleTitle=()=>{
       this.setState({title:"demo title"})
   }

    render(){
        return <div className="App">
            <h2>app,{this.state.num} </h2>
            <Button type={'primary'}  onClick={this.handleClick} > 按钮1</Button>
            <Button type={'primary'} onClick={this.handleTitle}>按钮2 </Button>
            <Demo2 title={this.state.title}/>
        </div>
    }
}

//子组件
class Demo2 extends React.Component{

    shouldComponentUpdate(nextProps,nextState){
     if(nextProps.title==this.props.title){
         return false;
     }
     return true;
    }
    render(){
        console.log("demo render()");
        return <div>
              <h2> I am demo ,{this.props.title}</h2>
        </div>
    }
}

export  default ComponentUpdate;