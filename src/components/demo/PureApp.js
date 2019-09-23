/**
 * Created by Arison on 2019/9/23.
 */
import React from 'react';

class PureApp extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            name:'PureApp',
            items: [1, 2, 3]
        };
    }


    componentDidMount(){

    }

    handleClick = () => {
        const { items } = this.state;
        items.pop();
        this.setState({ items:[].concat(items) });
    }

    render(){
        console.log("render()");
        return <div>
            <ul>
                {this.state.items.map(i => <li key={i}>{i}</li>)}
            </ul>
            <button onClick={this.handleClick}>delete</button>
        </div>
    }
}

export  default PureApp;