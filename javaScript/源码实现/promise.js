/**
 * Promise
 * 原理：观察者模式，then和catch用来指定回调函数，resolve和reject用来取出回调函数并执行
 */

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class MyPromise {
    constructor(fn) {
        this.state = PENDING;
        this.value = null;
        this.resolvedCallbacks = []; // 存取then回调函数
        this.rejectedCallbacks = []; // 存取catch回调函数
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        this.then = this.then.bind(this);
        try {
            fn(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    resolve(value){// 改变state, 将resolvedCallbacks中的回调函数依次取出执行
        if (this.state === PENDING) {
            this.state = RESOLVED
            this.value = value
            this.resolvedCallbacks.forEach(cb => cb(this.value))
        }
    }

    reject(value){// 改变state, 将rejectedCallbacks中的回调函数依次取出执行
        if (this.state === PENDING) {
            this.state = REJECTED
            this.value = value
            this.rejectedCallbacks.forEach(cb => cb(this.value))
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v; // 提供默认回调
        onRejected = typeof onRejected === 'function'? onRejected: r => {throw r}; // 提供默认回调
        if (this.state === PENDING) {
            this.resolvedCallbacks.push(onFulfilled)
            this.rejectedCallbacks.push(onRejected)
        }
        if (this.state === RESOLVED) {
            onFulfilled(this.value)
        }
        if (this.state === REJECTED) {
            onRejected(this.value)
        }
    }

    catch(onRejected) {
        onRejected = typeof onRejected === 'function'? onRejected: r => {throw r}; // 提供默认回调
        if(this.state === PENDING) {
            this.rejectedCallbacks.push(onRejected)
        }
        if (this.state === REJECTED) {
            onRejected(this.value)
        }
    }
}

//测试代码
const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello resolve');
    }, 1000);
}).then((value)=>{
    console.log(value);
    return new MyPromise((resolve, reject) => {
        reject('hello rejected');
    });
});

Promise.all = function(promises) {
    return new Promise((resolve, reject) => {
      let result = [];
      let len = promises.length;
      if(len === 0) {
        resolve(result);
        return;
      }
      const handleData = (data, index) => {
        result[index] = data;
        // 最后一个 promise 执行完
        if(index == len - 1) resolve(result);
      }
      for(let i = 0; i < len; i++) {
        // 为什么不直接 promise[i].then, 因为promise[i]可能不是一个promise
        Promise.resolve(promise[i]).then(data => {
          handleData(data, i);
        }).catch(err => {
          reject(err);
        })
      }
    })
  }