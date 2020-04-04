### Nginx命令
- `start nginx`: 开机
- `nginx -c [配置文件路径]`: 为nginx指定一个配置文件
- `nginx -t`: 不运行，只检查配置文件语法的正确性
- `nginx -v`: 显示nginx版本号
- `nginx -s stop`: 快速关闭(不保存任何信息，直接关闭)
- `nginx -s quit`: 正常关闭(保存相关信息，关闭web服务后再关闭nginx)
- `nginx -s reload`: 重新加载配置文件
- `nginx -s reopen`: 重新打开日志文件

### Nginx配置文件结构
![nginx配置文件结构](https://user-gold-cdn.xitu.io/2019/3/11/1696a118b4910728?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
- `main`： Nginx全局配置
  - `events`: 配置影响nginx服务器或与用户的网络连接，nginx服务器事件模型相关配置
  - `http`: httpGlobal配置，可以嵌套多个server来配置代理，缓存，日志等
    - `upstream`: 配置后端服务器的具体地址，是负载均衡和代理转发的关键配置
    - `server`：配置虚拟主机相关参数，一个http中可以有多个server，一个server中可以包含多个location
        - `location`: 具体路由的配置

样例配置：
```conf
# 每个配置项都要以; 结尾

## Global配置 
#定义Nginx运行的用户和用户组
user www www; 

#nginx进程数，通常设置成和cpu的数量相等
worker_processes 4;

#全局错误日志
error_log  logs/error.log;

#进程pid文件
pid logs/nginx.pid;

## events配置
events {
    # 选择事件模型，一般Linux系统就用epoll模型
    use epoll;

    #单个进程最大连接数（ 总最大连接数 = worker_connections * worker_processes ）
    worker_connections 1024;
    
    # 设置keepalive（http1.1默认开启长连接机制）
    connection: keepalive;
    #keepalive 超时时间，单位是秒
    keepalive_timeout 60;
}

http 
{
    #文件扩展名与文件类型映射表
    include /etc/nginx/conf/mime.types;
    #默认文件类型
    default_type  application/octet-stream;

    # 负载均衡配置负载服务器
    upstream backserver {
        server 192.168.0.1;
        server 192.168.0.2;
    }

    server
    { 
        location ^~ /rest/someService/data
        {
            # 代理转发
            proxy_pass        backserver;
            proxy_set_header  X-Real-IP  $remote_addr;
        }

        location ^~ /assets
        {
            # 静态伺服
            alias /var/share/;
            # 也可以用root指令
        }
     }

    # 导入其他配置
    include /d.conf/*
}
```

### Nginx内置变量
| 变量名 | 功能 |
| -- | -- |
| $host | 请求信息中的Host |
| $request_method | 客户端请求类型，如GET、POST等 |
| $remote_addr | 客户端的IP |
| $args | 请求中的query参数 |
| $content_length | 请求头的Content_length字段 |
| $http_user_agent | 客户端agent信息 |
| $http_cookie | 客户端cookie信息 |
| $remote_port | 客户端的端口 |
| $server_protocol | 请求使用的协议, 如HTTP/1.0, HTTP/1.1等 |
| $server_name | 服务器名 |
| $server_port | 服务器端口号 |

### 常见配置场景

#### 定制请求头

#### 静态伺服

#### 负载均衡

#### Gzip




