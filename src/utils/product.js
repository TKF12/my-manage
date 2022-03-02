export default function products(value, callback, tips1, tips2) {
  if (Number.isNaN(value)) {
    // callback('输入格式不正确，请输入数字');
    return callback(tips1);
  }
  if (value < 0) {
    // callback('价格不能小于0');
    return callback(tips2);
  }
  return callback();
}
