### 常见的状态码
#### 1XX 切换协议
- 101 Switching Protocols: 在HTTP升级为WebSocket的时候，如果服务器同意变更，就会发送状态码 101。

#### 2XX 成功
- 200 OK: 见得最多的成功状态码。通常在响应体中放有数据。
- 204 No Content: 含义与 200 相同，但响应头后没有 body 数据。
- 206 Partial Content: 顾名思义，表示部分内容，它的使用场景为 HTTP 分块下载和断点续传，当然也会带上相应的响应头字段Content-Range。

#### 3XX 重定向
- 301 Moved Permanently:永久重定向，对应着302 Found，即临时重定向。
比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址。
而如果只是暂时不可用，那么直接返回302即可，和301不同的是，浏览器并不会做缓存优化。
- 304 Not Modified: 协商缓存命中时返回的状态码

#### 4XX 客户端错误
- 400 Bad Request: 笼统地提示请求错误，一般可能是请求的query参数不对或者body不对
- 403 Forbidden： 服务器禁止访问，一般是权限相关的错误，可能是服务端的静态文件的属主属组不正确，伺服程序没有读取权限。也可能是客户端的证书问题
- 404 Not Found: 资源未找到，表示没在服务器上找到相应的资源。
- 405 Method Not Allowed: 请求方法不被服务器端允许。

#### 5XX 服务端错误
- 500 Internal Server Error: 一般是服务端程序运行出错
- 501 Not Implemented: 表示客户端请求的功能还不支持。
- 502 Bad Gateway: 服务器自身是正常的，但访问的时候出错了，通常是负载均衡等问题，常用重启大法解决
- 503 Service Unavailable: 表示服务器当前很忙，暂时无法响应服务。通常是处理的服务端的连接过多，有时服务器磁盘满了也会报这个错误

### 常见请求头
#### 日常请求头
[关于常用的http请求头以及响应头详解](https://juejin.im/post/5c17d3cd5188250d9e604628)
#### 缓存相关：
http1.1: Cache-Control、Etag/If-None-Match
http1.0：Expires、Last-Modified/If-Modified-Since

#### 断点续传相关（http1.1及以上才支持）：
[图解：HTTP 范围请求，助力断点续传、多线程下载的核心原理](https://juejin.im/post/5b555f055188251af25700aa)
```
1. 客户端请求资源
       |
2. 服务端返回响应，带响应头accept-ranges=bytes，表示该资源支持断点续传
       |
3. 客户端发请求带请求头：Range：bytes={start}-{end}
       |                            {start}-{end}
       |                            {start}-
       |                            -{end}
4. 服务端返回响应带响应头： Content-Range：bytes {start}-{end}/{sum}
                          Content-Length: {start - end + 1}
                              
```

