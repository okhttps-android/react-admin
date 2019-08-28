/**
 * Created by Arison on 2019/8/28.
 */
import React from 'react';
import {componse} from "../../utils/componse";

class ComponseDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'ComponseDemo'
        };
    }

    add1(str){
    return str+1;
    }
     add2(str){
    return str+2;
    }

    add3(str){
        return str+3;
    }

    add4(str){
        return str+4;
    }

    add5(str){
        return str+5;
    }

    add6(str){
        return str+6;
    }




    render(){
        let add=  componse(this.add1,this.add2);
        let result=componse(this.add1,this.add2,this.add3,this.add4,this.add5,this.add6)("test");
        return <div>
            计算结果：{result}
        </div>
    }
}

export  default ComponseDemo;