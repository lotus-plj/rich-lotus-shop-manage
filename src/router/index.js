import Vue from 'vue'
import Login from '../views/Login.vue';
import VueRouter from 'vue-router';
import Home from '../views/Home'
import Goods from '../views/goods/GoodsList'
import GoodsDetail from '../views/goods/components/GoodsDetail'

const routes = [
    {  path:'/',redirect:'/login'},
    {  path:'/login',component:Login},
    {  path:'/home',component:Home,
        //,redirect: '/HelloWorld',
        children: [
            // {path:'/welcome',component:Welcome},
            // {path:'/users',component:Users},
            {name:"goods",path:"/goods",component: Goods,meta: {
                    keepAlive: true //需要缓存
                }},
                {name:"goodsDetail",path:"/goodsDetail",component: GoodsDetail
            }
        ]
    }
]
Vue.use(VueRouter);

const router = new VueRouter({
    routes,

    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 } //期望滚动到哪个的位置
        }
    },

})
router.beforeEach((to,from,next)=>{
    //如果用户访问登录页，直接放行
    if(to.path ==="/login") return next();
    //从sessionStorage中获取到保存的token值
    const tokenStr = window.sessionStorage.getItem("token");
    //没有token，强制跳转到登录页面
    if(!tokenStr) return next("/login");
    next();//有token，直接放行
})

export default router
