import actionTypes from '../type'

//同步action
const getTestList=()=>{
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

export  default {
    getTestList,
}