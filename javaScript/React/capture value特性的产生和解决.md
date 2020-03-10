captureValue特性的产生和解决
### 什么是capture value特性
capture value特性是指在闭包中读取函数式组件的props和state无法得到最新值，因为函数式组件每次 Render 的内容都会形成一个快照并保留下来，因此当组件 Rerender N次时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 props、state。
例子：
```
const App = () => {
    const [temp, setTemp] = React.useState(5);
    const log = () => {
        setTimeout(() => {
            console.log("3 秒前 temp = 5，现在 temp =", temp);
        }, 3000);
    };

    return (
        <div onClick={() => {
            log();
            setTemp(3);
            // 3 秒前 temp = 5，现在 temp = 5
        }} >
            xyz
        </div>
    );
};
```

### 如何绕过capture value特性获取函数式组件的当前值
使用ref：
>useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。可以认为 ref 在所有 Render 过程中保持着唯一引用，因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 Render 间存在隔离。

```
const App = () => {
    const [temp, setTemp] = React.useState(5);
    const tempRef = React.useRef(5);
    const log = () => {
        setTimeout(() => {
            console.log("3 秒前 temp = 5，现在 temp =", tempRef.current);
        }, 3000);
    };

    return (
        <div onClick={() => {
            tempRef.current = 3;
            log();
            setTemp(3);
            // 3 秒前 temp = 5，现在 temp = 5
        }} >
            xyz
        </div>
    );
};
```