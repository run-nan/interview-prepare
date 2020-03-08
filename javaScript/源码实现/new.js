/**
 * new操作符
 * 原理：1. 创建一个空对象
         2. 让这个空对象的__proto__指向函数的原型prototype
         3. 执行构造函数中的代码，构造函数中的this指向该对象
         4. 如果构造函数有返回值，则以该对象作为返回值。若没有return或return了基本类型，则将新对象作为返回值
 */

function myNew(Constructor, ...args) {
    const obj = {};
    obj.__proto__ = Constructor.prototype;
    const result = Constructor.apply(obj, args);
    if(typeof result === 'object' && typeof result !== 'null') {
        return result;
    } else {
        return obj;
    }
}

// 测试代码
// ========= 无返回值 =============
const TestNewFun = function(name) {
    this.name = name;
};

const newObj = myNew(TestNewFun, 'foo');

console.log(newObj); // { name: "foo" }
console.log(newObj instanceof TestNewFun); // true
// ========= 有返回值 =============
const TestNewFun2 = function(name) {
    this.name = name;
    return {};
};

const newObj2 = myNew(TestNewFun2, 'foo');

console.log(newObj2); // {}
console.log(newObj2 instanceof TestNewFun2); // false
  