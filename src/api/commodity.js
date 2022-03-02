import requset from './requset';

export default {
  // 商品类目
  search(params) {
    return requset.get('/category/all', { params });
  },
  // 商品列表
  respTable(params) {
    return requset.get('/products/all', { params });
  },
  // 删除商品
  deleteItem(params) {
    return requset.delete(`/products/${params}`);
  },
  // 添加商品
  addItem(params) {
    return requset.post('/products/add', params);
  },
  // 查询商品信息
  queryProduct(params) {
    return requset.get(`/products/${params}`);
  },
  // 编辑商品提交
  editProduct(params) {
    return requset.put('/products/edit', params);
  },
};
