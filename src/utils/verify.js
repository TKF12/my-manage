let checkPending;
function email() {
  const emailVerify = /^[\S]+@[\S]+.com$/;
  return (rule, value, callback) => {
    clearTimeout(checkPending);
    if (!value) {
      callback(new Error('请输入邮箱'));
    }
    checkPending = setTimeout(() => {
      if (emailVerify.test(value)) {
        callback();
      }
      callback(new Error('邮箱格式不正确'));
    }, 1000);
  };
}
export default {
  email,
};
