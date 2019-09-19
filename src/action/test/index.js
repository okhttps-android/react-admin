import actionTypes from '../type'
import { createAction } from 'redux-actions';
import { createActions } from 'redux-actions';

//同步action
export  const getTestListOrigin=()=>{
    const testList=[
        {
            id:'1',
            name:'test1',
            description: 'test1-description',
        },
        {
            id:'2',
            name:'test2',
            description: 'test2-description',
        }
    ]
    return {
        type:actionTypes.GET_LIST_TEST,
        data:testList
    }
}

const getTestList=createAction(actionTypes.GET_LIST_TEST,()=>{
    const testList=[
        {
            id:'1',
            name:'test1',
            description: 'test1-description',
        },
        {
            id:'2',
            name:'test2',
            description: 'test2-description',
        }
    ]
    return testList;
});

const actions=createActions({
    [actionTypes.GET_LIST_TEST]:()=>{
        const testList=[
            {
                id:'1',
                name:'test1',
                description: 'test1-description',
            },
            {
                id:'2',
                name:'test2',
                description: 'test2-description',
            }
            ,
            {
                id:'3',
                name:'test3',
                description: 'test3-description',
            }
        ]
        return testList;
    },
    [actionTypes.TEST_DELETE]:(id)=>{
        console.info(`删除id为${id}的Book`);
        return { id };
    }
});

export  default {
    getTestList,
    actions
}