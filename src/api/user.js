import requset from './requset';

export default {
  // 登录
  login(params) {
    return requset.post('/passport/login', params);
  },
};
