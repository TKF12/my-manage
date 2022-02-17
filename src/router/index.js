import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getRouter from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';

Vue.use(VueRouter);

const menuRoutes = [
  {
    path: '/commodity',
    name: 'Commodity',
    component: Home,
    meta: {
      title: '商品',
      icon: 'shopping-cart',
    },
    children: [
      {
        path: 'productList',
        name: 'ProductList',
        component: () => import('@/views/page/commodity/ProductList.vue'),
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
        },
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: () => import('@/views/page/commodity/AddGoods.vue'),
        meta: {
          title: '添加商品',
          icon: 'medicine-box',
        },
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/page/commodity/Category.vue'),
        meta: {
          title: '类目管理',
        },
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      icon: 'home',
    },
    children: [{
      path: '/index',
      name: 'Index',
      component: () => import('@/views/page/home/index.vue'),
      meta: {
        title: '统计',
        icon: 'area-chart',
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];
const router = new VueRouter({
  routes,
});
let lock = false;
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // 下个页面不是登录页面
  if (to.path !== '/login') {
    // 有登录信息，可以跳转到下个路由，否则回到登录页面
    if (store.state.user.appkey && store.state.user.email && store.state.user.role) {
      // 防止访问一个路由，就往路由里面添加过滤后的路由
      if (!lock) {
        // 可以访问的路由
        const menuRouter = getRouter(store.state.user.role, menuRoutes);
        // 所有路由保存到vux，后再跳转页面
        store.dispatch('changeRoutes', routes.concat(menuRouter)).then(() => {
          // 添加路由
          router.addRoutes(menuRouter);
          next();
        });
        lock = true;
      }
    } else {
      next({ name: 'Login' });
    }
  }
  return next();
});

export default router;
