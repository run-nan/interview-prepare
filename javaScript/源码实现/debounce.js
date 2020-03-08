/**
 * 函数防抖debouce
 * 原理：函数被调用后，在 n 秒内函数只能执行一次，
 *      如果在 n 秒内又触发了事件，则会重新计算函数
 *      执行时间（保证函数上一次执行和下一次执行最少
 *      间隔n秒，而最多可间隔无限秒）
 */

/**
 * @desc 函数防抖
 * @param func 函数
 * @param interval 延迟执行毫秒数
 */
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}

// 测试代码: 
const timer = setInterval(debounce(() => {
    console.log('hello world');
}, 1000), 100);

const timeoutTimer = setTimeout(() => {
    clearInterval(timer);
}, 2000);

