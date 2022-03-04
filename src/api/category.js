import requset from './requset';

export default {
  // 商品类目
  categoryList(params) {
    return requset.get('/category/all', params);
  },
  // 商品类目添加
  addCategory(params) {
    return requset.post('/category/add', params);
  },
  // 删除商品类目
  deleteCategory(params) {
    return requset.delete(`/category/${params}`);
  },
  // 商品类目修改
  editCategory(params) {
    return requset.put('/category/edit', params);
  },
};
