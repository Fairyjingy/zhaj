import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Index from '@/views/index'
import Login from '@/views/login'
import NotFound from '@/views/404'
import dailysafeEdu from '@/views/safeEducation/dailysafeEdu'
import edu from '@/views/safeEducation/edu'
import Approval from '@/views/approval'
import eduPerson from '@/views/safeEducation/eduPerson'
import NumAnalysis from '@/views/numAnalysis'
import SafeSkill from '@/views/safeSkill'
import dangerFactor from '@/views/safePlan/dangerFactor'
import finish from '@/views/safePlan/finish'
import daysafeCheck from '@/views/safeCheck/daysafeCheck'
import setsafeCheck from '@/views/safeCheck/setsafeCheck'
import safeChangeRecord from '@/views/safeCheck/safeChangeRecord'
import disclosesafeskill from '@/views/disclosesafeskill'
import dangerprojectPlan from '@/views/dangerproject/plan'
import dangerprojectrecord from '@/views/dangerproject/record'
import check from '@/views/dangerproject/check'
import safeUrgent from '@/views/safeUrgent'
import managerSafeappraise from '@/views/appraise/managerSafeappraise'
import subcontractsafeappraise from '@/views/appraise/subcontractsafeappraise'
import echarts from '@/views/echarts/echart'
import safeEducationEchart from '@/views/echarts/safeEducation'
import dangerFactorEchart from '@/views/echarts/dangerFactor'
import dangerProjectEchart from '@/views/echarts/dangerProject'
import safeTestEchart from '@/views/echarts/safeTest'
 
Vue.use(Router)
 
let routes = [
  {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
  },
  { path: '/login',  name: '登录', component: Login},
  {
    path: '/',
    component: Index,
    name: '首页',
    children: [
      { path: '/numAnalysis', component:NumAnalysis , name: '统计分析',meta: { requiresAuth: true }, },
      { path: '/safeUrgent', component:safeUrgent , name: '安全应急',meta: { requiresAuth: true }, },
      { path: '/approval', component:Approval , name: '审批管理',meta: { requiresAuth: true }, },
      { path: '/disclosesafeskill', component:disclosesafeskill , name: '安全技术交底',meta: { requiresAuth: true }, },
      { path: '/safeSkill', component:SafeSkill , name: '安全技术管理',meta: { requiresAuth: true }, },
    ]
},
{
    path: '/safePlan',
    component: Index,
    name: '安全策划管理',
    children: [
      { path: '/dangerFactor', component:dangerFactor , name: '危险因素清单',meta: { requiresAuth: true }, },
      { path: '/finish', component:finish , name: '安全策划交底',meta: { requiresAuth: true }, },
    ]
},
{
    path: '/safeCheck',
    component: Index,
    name: '安全检查管理',
    children: [
      { path: '/daysafeCheck', component:daysafeCheck , name: '日常安全检查',meta: { requiresAuth: true }, },
      { path: '/setsafeCheck', component:setsafeCheck , name: '定期安全检查',meta: { requiresAuth: true }, },
      { path: '/safeChangeRecord', component:safeChangeRecord , name: '安全整改记录',meta: { requiresAuth: true }, },
    ]
},
{
    path: '/education',
    component: Index,
    name: '安全教育管理',
    children: [
      { path: '/eduPerson', component:eduPerson , name: '人员管理',meta: { requiresAuth: true }, },
      { path: '/edu', component:edu , name: '入场安全教育',meta: { requiresAuth: true }, },
      { path: '/dailysafeEdu', component:dailysafeEdu , name: '日常安全教育',meta: { requiresAuth: true }, },
    ]
},
{
    path: '/dangerProject',
    component: Index,
    name: '危险工程管理',
    children: [
      { path: '/dangerprojectPlan', component:dangerprojectPlan , name: '危险工程监控计划',meta: { requiresAuth: true }, },
      { path: '/dangerprojectrecord', component:dangerprojectrecord , name: '危险工程监管记录',meta: { requiresAuth: true }, },
      { path: '/dangersafecheck', component:check , name: '安全验收',meta: { requiresAuth: true }, },
    ]
},
{
    path: '/appraise',
    component: Index,
    name: '安全考核',
    children: [
      { path: '/managerSafeappraise', component:managerSafeappraise , name: '管理层安全考核',meta: { requiresAuth: true }, },
      { path: '/subcontractsafeappraise', component:subcontractsafeappraise , name: '分包安全考核',meta: { requiresAuth: true }, },
    ]
},
{
  path:"/echarts",
  component:echarts,
  name:"大数据中心",
  children:[
    { path: '/safeEducationEchart', component:safeEducationEchart , name: '安全教育',meta: { requiresAuth: true }, },
    { path: '/dangerFactorEchart', component:dangerFactorEchart , name: '危险因素',meta: { requiresAuth: true }, },
    { path: '/dangerProjectEchart', component:dangerProjectEchart , name: '危险工程',meta: { requiresAuth: true }, },
    { path: '/safeTestEchart', component:safeTestEchart , name: '安全考核',meta: { requiresAuth: true }, },
  ]
},
  // {
  //     path: '*',
  //     hidden: true,
  //     redirect: { path: '/404' }
  // }
    
  ]
export default routes;