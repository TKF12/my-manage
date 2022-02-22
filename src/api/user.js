import requset from './requset';

export default {
  // 登录
  login(params) {
    return requset.post('/passport/login', params);
  },
  // 商品列表搜索
  search(params) {
    return requset.get('/products/all', params);
  },
};
