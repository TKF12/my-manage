import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getRouter from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Register from '../views/layout/Register.vue';
import Login from '../views/layout/Login.vue';
import Index from '../views/page/home/index.vue';
// () => import('@/views/page/home/index.vue'),

Vue.use(VueRouter);

const menuRoutes = [
  {
    path: '/commodity',
    name: 'Commodity',
    component: Home,
    meta: {
      title: '商品',
      icon: 'shopping-cart',
      show: true,
    },
    children: [
      {
        path: 'productList',
        name: 'ProductList',
        component: () => import('@/views/page/commodity/ProductList.vue'),
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          show: true,
        },
      },
      {
        path: 'addGoods',
        name: 'AddGoods',
        component: () => import('@/views/page/commodity/AddGoods.vue'),
        meta: {
          title: '添加商品',
          icon: 'medicine-box',
          show: true,
        },
      },
      {
        path: 'editItem/:Id',
        name: 'EditItem',
        component: () => import('@/views/page/commodity/AddGoods.vue'),
        meta: {
          title: '编辑商品',
          icon: 'medicine-box',
          show: false,
        },
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import('@/views/page/commodity/Category.vue'),
        meta: {
          title: '商品类目管理',
          show: true,
          icon: 'edit',
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
      show: true,
    },
    // 重定向，当访问的路径是/时，访问的是统计页面
    redirect: '/index',
    children: [{
      path: '/index',
      name: 'Index',
      component: Index,
      meta: {
        title: '统计',
        icon: 'area-chart',
        show: true,
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      show: false,
    },
  },
];
const router = new VueRouter({
  routes,
});
// 过滤后的路由是否已经添加过了
let lock = false;
router.beforeResolve((to, from, next) => {
  // console.log(to, from);
  // 下个页面不是登录页面
  if (to.path !== '/login' && to.path !== '/register') {
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
      return next();
    }
    return false;
  }
  return next();
});

export default router;
