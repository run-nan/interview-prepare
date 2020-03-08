/**
 * 函数节流throttle
 * 原理：任务频繁触发的情况下，只有任
 *      务触发的间隔超过指定间隔的时
 *      候，任务才会执行（保证函数上一
 *      次执行和下一次执行间隔固定为n秒）
 */

/**
 * 函数节流：定时器版
 * @param {Function} fn 要节流的函数
 * @param {number} interval 节流间隔
 */
function throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false; // 把canRun标志位置为false
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true; // 在要节流的函数执行完之后把canRun标志位置为true
        }, interval);
    };
}

/**
 * 函数节流：时间戳版
 * @param {Function} fn 要节流的函数
 * @param {number} interval 节流间隔
 */
function throttle2(fn, interval = 300) {
    let previous = Date.now();
    return function() {
        let now = Date.now();
        if(now - previous > interval) {
            fn.call(this, arguments);
            previous = Date.now();
        }
    }
}

// 测试代码
const timer = setInterval(throttle(() => {
    console.log('hello world');
}, 1000), 100);

const timeoutTimer = setTimeout(() => {
    clearInterval(timer);
}, 3000);