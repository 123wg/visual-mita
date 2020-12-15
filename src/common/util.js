/* eslint-disable */
export function deepClone(obj) {
  if (obj === null) return null; // null 的情况
  if (obj instanceof RegExp) return new RegExp(obj); // 正则表达式的情况
  if (obj instanceof Date) return new Date(obj); // 日期对象的情况
  if (typeof obj === 'Function') return new function (obj) {}(); // 函数的情况
  if (typeof obj !== 'object') {
    // 非复杂类型,直接返回 也是结束递归的条件
    return obj;
  }
  // [].__proto__.constructor=Array()
  // {}.__proto__.constructor=Object()
  // 因此处理数组的情况时,可以取巧用这个办法来new新对象
  const newObj = new obj.__proto__.constructor();
  for (const key in obj) {
    newObj[key] = deepClone(obj[key]);
  }
  return newObj;
}
