/**
 * call和apply
 * 原理：call和apply函数自身的this就是要调用的函数
 */

Function.prototype.myCall = function(context, ...args) {
    if(typeof this !== 'function') {
        // call的调用者必须是函数
        throw new Error('Error');
    }
    context = context || window;
    // this就是call函数的调用者，也就是要绑定context并执行的函数
    fn = Symbol('fn');
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}

Function.prototype.myApply = function(context, argArray) {
    if(typeof this !== 'function') {
        // call的调用者必须是函数
        throw new Error('Error');
    }
    context = context || window;
    // this就是call函数的调用者，也就是要绑定context并执行的函数
    fn = Symbol('fn');
    context.fn = this;
    const result = context.fn(...argArray);
    delete context.fn;
    return result;
}

const bar = function() {
    console.log(this.name, arguments);
};
  
bar.prototype.name = 'bar';
  
const foo = {
    name: 'foo'
};
  
bar.myCall(foo, 1, 2, 3); // foo [1, 2, 3]
bar.myApply(foo, [1, 2, 3]); // foo [1, 2, 3]
