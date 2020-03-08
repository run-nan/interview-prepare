/**
 * bind函数
 * 原理：返回一个新的函数，函数内部的逻辑是用apply函数，绑定this并执行；
 *      需要注意new的优先级高于bind，因此，被bind函数如果是new出来的，
 *      则this要以new的this判定规则为主
 */

Function.prototype.myBind = function(context, ...args) {
    if(typeof this !== 'function') {
        throw new Error('error');
    }

    const self = this;
    const boundFn = function() {
        self.call(this instanceof self ? // 判断被bind的函数是否是以new的形式调用
            this // 被bind的函数是以new的形式调用，则函数上下文以new的规则判定
            : context, // 函数上下文是传入的context
            ...args);
    }
    boundFn.prototype = Object.create(self.prototype);
    return boundFn;
}

// 测试代码
const bar = function() {
    console.log(this.name, arguments);
};
  
bar.prototype.name = 'bar';
  
const foo = {
    name: 'foo'
};
  
const bound = bar.myBind(foo, 22, 33, 44);
new bound(); // bar, [22, 33, 44]
bound(); // foo, [22, 33, 44]