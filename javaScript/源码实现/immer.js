function immer(state, thunk) {
    let copies = new Map();
    const handler = {
        get(target, prop) { // 增加一个 get 的劫持，返回一个 Proxy
            return new Proxy(target[prop], handler);
        },
        set(target, prop, value) {
            const copy = {...target}; // 浅拷贝
            copy[prop] = value; // 给拷贝对象赋值
            copies.set(target, copy);
        }
    };

    function finalize(state) { // 增加一个 finalize 函数
        const result = {...state};
        Object.keys(state).map(key => { // 以此遍历 state 的 key
        const copy = copies.get(state[key]);
        if(copy) { // 如果有 copy 表示被修改过
            result[key] = copy; // 就是用修改后的内容
        } else {
            result[key] = state[key]; // 否则还是保留原来的内容
        }
        });
        return result;
    }

    const proxy = new Proxy(state, handler);
    thunk(proxy);
    return finalize(state);
}