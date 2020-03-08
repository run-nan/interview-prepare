### this：
![this](https://user-gold-cdn.xitu.io/2018/11/15/16717eaf3383aae8?imageslim)

### 作用域链和闭包
当某个函数被创建时，会创建一个执行环境以及相应的作用域链，然后使用arguments和其他命名参数来初始化函数的`活动对象`。
在作用域链中，外部函数的活动对象处于第二位，外部函数的外部函数的活动对象处于第三位......直到作为作用域链终点的全局执行环境。
![](https://pic2.zhimg.com/711d147846b968533d135ce554a07c2f_r.jpg)
![](https://pic3.zhimg.com/102c46bf6254e7221fb2ce906f86e2d9_r.jpg)

闭包的定义：有权访问另一个函数作用域中的变量的函数
```javaScript
var createCompareNames = function(properName) {
    var temp = 5;
    return function (obj1, obj2) {
        return obj1[properName] === obj2[properName];
    }
} 

var compare = createCompareNames('name');
```

在调用完createCompareNames之后，createCompareNames的作用域链被销毁，但是其活动对象没有被销毁，这是闭包的本质，且闭包保存的是整个活动对象，因此，其实var temp也还存留在内存中

### 经典面试题：
