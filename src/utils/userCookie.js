import Cookies from 'js-cookie';

// 设置cookie
/**
 * @description:
 * @param {Object} info 对象
 */
export function setCookie(info) {
  // 对象转化成二维数组
  // [[username, xxx]]
  const arr = Object.entries(info);
  for (let i = 0; i < arr.length; i += 1) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
  return true;
}

// 获取cookie
export function getCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    email: Cookies.get('email'),
    reol: Cookies.get('reol'),
  };
}
// 删除cookie
export function deteCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('email');
  Cookies.remove('reol');
}
