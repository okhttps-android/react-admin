export default {
    menus: [


        {
            key: '/app/user', title: '用户管理', icon: 'copy',
            subs: [
                { key: '/app/user/bind', title: '绑定账号', component: 'BasicTable'},
                { key: '/app/user/list', title: '用户列表', component: 'MyUserListTable'},
                { key: '/app/user/client', title: '代理信息', component: 'MyAgentListTable'},
            ],
        },
        {
            key: '/app/money', title: '收益管理', icon: 'copy',
            subs: [
                { key: '/app/money/all', title: '收益统计', component: 'ProfitListTable'},
                { key: '/app/money/day', title: '收益统计-明细', component: 'ProfitDetailTable',
                    noShow:true
                   }
            ],

        },
        {
            key:'/app/withdraw',title:'提现管理',icon:'copy',
            subs:[
                {
                    key:'/app/withdraw/account',title:'提现账号',component:'WithDrawAccountTable',
                },
                {
                    key:'/app/withdraw/record',title:'提现记录',component:'WithDrawRequestTable',

                }
            ]
       },
        {
            key:'/app/userInfo',component:'UserInfoPage',noShow:true
        }

    ],
    others: [] // 非菜单相关路由
}