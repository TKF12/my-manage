import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截
instance.interceptors.request.use((config) => {
  // 请求的是登录路径 直接返回
  if (config.url.includes('/passport')) {
    return config;
  }
  return {
    ...config,
    params: {
      appkey: store.state.user.appkey,
      // 参数
      ...config.params,
    },
  };
}, (error) => Promise.reject(error));
// 响应拦截
instance.interceptors.response.use((da) => {
  // 错误警告
  if (da.data.status === 'fail') {
    return Promise.reject(da.data.msg);
  }
  return da.data.data;
}, (error) => Promise.reject(error));

export default instance;
