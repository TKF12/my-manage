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
};
