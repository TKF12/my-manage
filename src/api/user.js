import requset from './requset';

export default {
  // 登录
  login(params) {
    return requset.post('/passport/login', params);
  },
  // 获取验证码
  verify(params) {
    return requset.post('/passport/getCode', { email: params });
  },
  register(params) {
    return requset.post('/passport/logon', params);
  },
};
