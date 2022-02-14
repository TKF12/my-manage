import request from './requset';

export default {
  login(params) {
    return request.post('/passport/login', params);
  },
};
