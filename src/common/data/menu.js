// 安全策划管理
// 	危险因素清单
// 	安全策划交底
// 安全检查管理
// 	日常安全检查
// 	定期安全检查
// 	安全整改记录
// 安全教育管理
// 	入场安全管理
// 	日常安全管理
// 	人员管理
// 安全技术交底
// 危险工程管理
// 	危险工程监控计划
// 	危险工程监管记录
// 	安全验收
// 安全考核
// 	管理层安全考核
// 	分包安全考核
// 安全应急
// 审批管理
// 安全技术管理
var menu=
    [
        // {id: 1,
        // parentId: -1,
        // users: null,
        // icon: "icon iconfont icon-huabanfuben",
        // name: "统计分析",
        // spread: false,
        // path: "/numAnalysis",
        // component: null,
        // authority: null,
        // redirect: null,
        // keepAlive: "0",
        // code: null,
        // type: "0",
        // label: "统计分析",
        // sort: 3,
        // children: []
        // },
        {id: 2,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-tubiao_xuqiu",
        name: "基础信息管理",
        // name: "安全策划管理",
        spread: false,
        path: "/safePlan",
        component: "",
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "基础信息管理",
        sort: 10,
        children: [
          {id: 34,
          parentId: 2,
          children: [],
          users: null,
          icon: "",
          name: "人员信息管理",
          // name: "危险因素清单",
          spread: false,
          path: "/dangerFactor",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "人员信息管理",
          sort: 2,
          },
          // {id: 35,
          // parentId: 2,
          // children: [],
          // users: null,
          // icon: "",
          // name: "安全策划交底",
          // spread: false,
          // path: "/finish",
          // component: "",
          // authority: null,
          // redirect: null,
          // keepAlive: "0",
          // code: null,
          // type: "0",
          // label: "安全策划交底",
          // sort: 2,
          // }
        ],
        },
        {id: 3,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-tubiao_xuqiu",
        name: "培训计划管理",
        spread: false,
        path: "/safeCheck",
        component: "",
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "培训计划管理",
        sort: 10,
        children: [
          {id: 62,
          parentId: 3,
          children: [],
          users: null,
          icon: "",
          name: "培训计划管理",
          spread: false,
          path: "/daysafeCheck",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "培训计划管理",
          sort: 2,
          },
          {id: 61,
          parentId: 3,
          children: [],
          users: null,
          icon: "",
          name: "定期安全检查",
          spread: false,
          path: "/setsafeCheck",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "定期安全检查",
          sort: 2,
          },
          {id: 63,
          parentId: 3,
          children: [],
          users: null,
          icon: "",
          name: "安全整改记录",
          spread: false,
          path: "/safeChangeRecord",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "安全整改记录",
          sort: 2,
          }
        ],
        },
        {id: 4,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-tubiao_xuqiu",
        name: "培训资料管理",
        spread: false,
        path: "/education",
        component: "",
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "培训资料管理",
        sort: 10,
        children: [
          {id: 23,
          parentId: 4,
          children: [],
          users: null,
          icon: "",
          name: "培训资料管理",
          spread: false,
          path: "/edu",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "培训资料管理",
          sort: 2,
          },
          {id: 24,
          parentId: 4,
          children: [],
          users: null,
          icon: "",
          name: "日常安全教育",
          spread: false,
          path: "/dailysafeEdu",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "日常安全教育",
          sort: 2,
          },
          {id: 22,
          parentId: 4,
          children: [],
          users: null,
          icon: "",
          name: "人员管理",
          spread: false,
          path: "/eduPerson",
          component: "",
          authority: null,
          redirect: null,
          keepAlive: "0",
          code: null,
          type: "0",
          label: "人员管理",
          sort: 2,
          },
        ],
        },
        // {id: 5,
        // parentId: -1,
        // users: null,
        // icon: "icon iconfont icon-huabanfuben",
        // name: "安全技术交底",
        // spread: false,
        // path: "/disclosesafeskill",
        // component: null,
        // authority: null,
        // redirect: null,
        // keepAlive: "0",
        // code: null,
        // type: "0",
        // label: "安全技术交底",
        // sort: 3,
        // children: []
        // },
        {id: 6,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-huabanfuben",
        name: "考核题库管理",
        spread: false,
        path: "/dangerProject",
        component: null,
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "考核题库管理",
        sort: 3,
        children: [
            {id: 61,
            parentId: 6,
            children: [],
            users: null,
            icon: "",
            name: "题库管理",
            spread: false,
            path: "/dangerprojectPlan",
            component: "",
            authority: null,
            redirect: null,
            keepAlive: "0",
            code: null,
            type: "0",
            label: "题库管理",
            sort: 2,
            },
            {id: 62,
            parentId: 6,
            children: [],
            users: null,
            icon: "",
            name: "考核管理",
            spread: false,
            path: "/dangerprojectrecord",
            component: "",
            authority: null,
            redirect: null,
            keepAlive: "0",
            code: null,
            type: "0",
            label: "考核管理",
            sort: 2,
            },
            {id: 63,
            parentId: 6,
            children: [],
            users: null,
            icon: "",
            name: "安全验收",
            spread: false,
            path: "/dangersafecheck",
            component: "",
            authority: null,
            redirect: null,
            keepAlive: "0",
            code: null,
            type: "0",
            label: "安全验收",
            sort: 2,
            },
        ]
        },
        {id: 7,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-huabanfuben",
        name: "安全考核",
        spread: false,
        path: "/appraise",
        component: null,
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "安全考核",
        sort: 3,
        children: [
            {
                id: 71,
                parentId: 7,
                children: [],
                users: null,
                icon: "",
                name: "管理层安全考核",
                spread: false,
                path: "/managerSafeappraise",
                component: "",
                authority: null,
                redirect: null,
                keepAlive: "0",
                code: null,
                type: "0",
                label: "管理层安全考核",
                sort: 2,
            },
            {
                id: 72,
                parentId: 7,
                children: [],
                users: null,
                icon: "",
                name: "分包安全考核",
                spread: false,
                path: "/subcontractsafeappraise",
                component: "",
                authority: null,
                redirect: null,
                keepAlive: "0",
                code: null,
                type: "0",
                label: "分包安全考核",
                sort: 2,
            },
        ]
        },
        {id: 8,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-huabanfuben",
        name: "安全应急",
        spread: false,
        path: "/safeUrgent",
        component: null,
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "安全应急",
        sort: 3,
        children: []
        },
        {id: 9,
        parentId: -1,
        users: null,
        icon: "icon iconfont icon-huabanfuben",
        name: "审批管理",
        spread: false,
        path: "/approval",
        component: null,
        authority: null,
        redirect: null,
        keepAlive: "0",
        code: null,
        type: "0",
        label: "审批管理",
        sort: 3,
        children: []
        },
        // {id: 10,
        // parentId: -1,
        // users: null,
        // icon: "icon iconfont icon-huabanfuben",
        // name: "安全技术管理",
        // spread: false,
        // path: "/safeSkill",
        // component: null,
        // authority: null,
        // redirect: null,
        // keepAlive: "0",
        // code: null,
        // type: "0",
        // label: "安全技术管理",
        // sort: 3,
        // children: []
        // },
      
];
export default menu;