import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import CategoryEdit from './views/Cate/CategoryEdit.vue'
import CategoryList from './views/Cate/CategoryList.vue'
import StaffList from './views/Staff/StaffList.vue'
import CommentList from './views/Comment/CommentList.vue'
import OrderList from './views/Order/OrderList.vue'
import Examine from './views/Volunteer/Examine.vue'
import Health from './views/Volunteer/Health.vue'
import Echart from './views/Echart/Echart.vue'
import ArticleEdit from './views/Article/ArticleEdit.vue'
import ArticleList from './views/Article/ArticleList.vue'
import PersonInfo from './views/Staff/PersonInfo.vue'
import Issue from './views/Issue/IssueList.vue'
import Edit from './views/Staff/edit.vue'

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {isPublic: true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {isPublic: true}
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      // 路由嵌套
      children: [
        // 分类
        {path: '/categories/create',component: CategoryEdit},
        {path: '/categories/list',component: CategoryList},
        // 动态路径参数，props：true代表路径中的参数注入到组件中，组件可以直接使用_id这个参数
        {path: '/categories/edit/:id',component: CategoryEdit, props: true},
        // 评价
        {path: '/comments/list',component: CommentList},
        // 员工
        {path: '/staffs/edit',component: Edit},
        {path: '/staffs/list',component: StaffList},
        // 订单
        {path: '/orders/list',component: OrderList},
        // 志愿者
        {path: '/volunteers/examine', component: Examine},
        {path: '/volunteers/health', component: Health},
        // 公告
        {path: '/articles/create',component: ArticleEdit},
        {path: '/articles/list',component: ArticleList},
        {path: '/articles/edit/:id',component: ArticleEdit, props: true},
        // 图表
        {path: '/echarts', component: Echart},
        // 个人信息
        {path: '/editPersons/:id', component: PersonInfo, props: true, name: 'editPersonInfo'},
        {path: '/checkPersons/:id', component: PersonInfo, props: true, name: 'checkPersonInfo'},
        // 意见反馈
        {path: '/issues/list', component: Issue}
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
}) 

export default router
