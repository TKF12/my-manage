import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];
// {
//   path: '/about',
//   name: 'About',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
// },
const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  console.log(to, from);
  // 下个页面不是登录页面
  if (to.path !== '/login') {
    // 有登录信息，可以跳转到下个路由，否则回到登录页面
    if (store.state.user.appkey && store.state.user.email && store.state.user.role) {
      next();
    } else {
      next({ name: 'Login' });
    }
  }
  return next();
});

export default router;
