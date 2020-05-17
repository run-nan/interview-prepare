```javaScript
const xhr = new XMLHttpRequest(); // IE7以下版本是ActiveXObject对象
xhr.onreadyStateChange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status >=200 && xhr.status <400) {
            doSomething(JSON.parse(xhr.responseText));
        }
    } else {
        alert('Request Error');
    }
};
xhr.open('get', '/example', true); // 第三个参数表示请求是否异步
xhr.send(null); // 参数是请求的body，如果没有body，则必须传null
```

xhr.readyState:

| 取值 | 含义 |
| ---- | ---- |
| 0 | 未初始化，尚未调用open方法 |
| 1 | 启动，已经调用open方法，但尚未调用send方法 |
| 2 | 发送，调用了send方法，但尚未收到响应 |
| 3 | 接收，已经接收到了部分响应数据，但是没有接受完 |
| 4 | 完成，已经接收到全部请求数据 |