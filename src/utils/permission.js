// coustomer 普通用户可以访问的页面，admin 管理员可以访问的页面
const permission = {
  coustomer: [
    {
      name: 'Commodity',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'AddGoods',
    },
    {
      name: 'EditItem',
    },
    // {
    //   name: 'Category',
    // },
  ],
  admin: [
    {
      name: 'Commodity',
    },
    {
      name: 'ProductList',
    },
    {
      name: 'AddGoods',
    },
    {
      name: 'Category',
    },
    {
      name: 'EditItem',
    },
  ],
};
// 过滤可以访问的路由
export default function getRouter(role, routes) {
  // 对应权限的所有路由名称
  const allRouteNames = permission[role].map((e) => e.name);
  // 路由
  const accessRoutes = routes.filter((r) => {
    // 保存当前路由
    const obj = r;
    // 对应权限是否有这个路由
    if (allRouteNames.indexOf(r.name) !== -1) {
      // 子路由对应权限的路由
      obj.children = obj.children.filter((c) => allRouteNames.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  // 返回过滤后的路由
  return accessRoutes;
}
