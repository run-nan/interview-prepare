### React源码中几个重要的对象
- **ReactElement:**
```
|- ReactElement
        |- type > - 取值为字符串(div、span等)：DOM元素
                > - 取值为组件构造函数：React组件
        |- props：组件或者DOM元素上的属性
            |- children 子ReactElement数组
        |- key：元素标识，用于优化更新
```

- **ReactClass:**
```
|- ReactClass
        |- 生命周期方法：componentWillMount
                        componentDidMount
                        componentWillUnmount
                        componentWillReceiveProps
                        componentWillUpdate
                        componentDidUpdate
                        shouldComponentUpdate
        |- render方法：生成ReactElement
        |- _reactInternalInstance: 对应的ReactComponent实例
```

- **ReactComponent:**
```
|- ReactComponent > ReactDOMTextComponent
                    ReactDOMEmptyComponent
                    **ReactDOMComponent**
                    **ReactCompositeComponent**
                            |- _instance: 对应的ReactClass实例
                            |- _currentElement: 当前元素对应的ReactElement
                            |- _renderedComponent：render出的元素的ReactComponent实例
        |-id：在DOM树中的唯一标识
        |-mountComponent(id): 挂载时调用 > ReactCompositeComponent: 调用ReactClass挂载阶段的生命周期方法
                                                                   调用_renderedComponent的mountComponent方法
                                        > ReactDOMComponent: 递归调用子元素的mountComponent方法，生成标识为id的HTML标记 
        |-receiveComponent(nextReactElement): 更新时调用 > React
```

### 个人理解
- 所谓挂载这个**动作**，其实只在调用ReactDOM.render时触发了一次，并不是一个组件一个组件地挂载到DOM上。组件的挂载阶段只是负责生成HTML标记标记而已, 挂载这个动作是指把根组件的HTML标记挂载到DOM上
- 