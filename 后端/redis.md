### 键
操作键的基本命令语法： `<COMMAND> <KEY>`
操作键的基本指令：
- `DEL <key>`: 删除键
- `EXISTS <key>`: 检查键是否存在（返回结果1为存在，0为不存在）
- `TYPE <key>`: 查看键所存储的数据类型（none（键不存在），string，list，set, zset, hash）
- `RENAME <key> <new_key>`: 重命名键
- `EXIPRE <key> <time_seconds>`: 设定键的过期时间（以秒记， 超过过期时间后，键被删除）

使用redis存储数据的时候，有时候为了查看的方便，通常会有层级或者说是目录，这时候我们在set的时候，需要将key值使用“:”的符号来区分层级关系，比如：set(“a:b”, “123”)，那么在redis中就是a目录下的key值为b的value为123。

### 数据类型
string / hash / list / set / zset(有序集合)
- #### 字符串String
  - `SET <key> <value>`: 将键设为字符串，例：`SET mykey "value"`;
  - `GET <key>`: 获取键值
  - `GETRANGE <key> <start> <end>`: 获取子字符串，例：`GETRANGE mykey 0 1` -> "va"
  - `GETSET <key> <value>`: 把键设为新值，并返回旧值
  - `MGET <key1> <key2> ...`: 获取多个键的值
  - `MSET <key1> <value1> <key2> <value2> ...`: 设置多个键的值
  - `APPEND <key> <value>`: 如果key已经存在且是一个字符串，APPEND命令将把value追加到原来的值的末尾

- #### 哈希Hash
  hash就是数据结构中的map，是键值对(field:value)映射表，且值只能是string
  - `HDEL <key> <field1> <field2> ...`: 删除哈希表中的一个或多个键
  - `HEXISTS <key> <filed>`: 查看哈希表中某个键是否存在
  - `HGET <key> <field>`: 获取哈希表中某个键的值
  - `HMGET <key> <field1> <field2>...`: 获取哈希表中指定字段的值
  - `HGETALL <key>`: 获取哈希表中所有键的值
  - `HSET <key> <field> <value>`: 设置哈希表中某个键的值
  - `HMSET <key> <field1> <value1> <filed2> <filed2> ...`: 设置哈希表中多个键的值
  - `HKEYS <key>`: 获取哈希表中的所有键名
  - `HVALS <key>`: 获取哈希表中的所有值
  - `HLEN <key>`: 获取哈希表中的键的数量

- #### 列表List
  - `LPUSH <key> <value1> <value2> ...`: 向列表中的表头插入元素，例：`LPUSH mylist a b c` -> [c, b, a]
  - `RPUSH <key> <value1> <value2> ...`: 向列表表尾插入元素， 例：`RPUSH mylist a b c` -> [c, b, a, a, b, c]
  - `LPOP <key>`: 弹出表头元素
  - `RPOP <key>`: 弹出表尾元素
  - `LLEN <key>`: 返回列表长度
  - `LREM <key> <count> <value>`: 根据参数count的值，移除列表中与参数value相等的元素。
    count的值可以是以下几种：
    count > 0: 从表头开始向表尾搜索，移除与value相等的元素，数量为count。
    count < 0: 从表尾开始向表头搜索，移除与value相等的元素，数量为count的绝对值。
    count = 0: 移除表中所有与value相等的值。
  - `LRANGE <key> <start> <stop>`: 获取列表[start]到列表[stop]的值, 列表下标以0开始，跟python一样支持负数下标
  - `LSET <key> <index> <value>`: 将列表下标为index的元素设置为value
  - `LTRIM <key> <start> <stop>`: 只保留列表下标start到stop之间的元素
  - `LINDEX <key> <index>`: 获取下标为index的元素
  - `LINSERT <key> [BEFORE | AFTER] <pivot> <value>`: 将值value插入到列表中的值pivot之前/后
  
- #### 集合Set
  - `SADD <key> <value1> <value2> ...`: 给集合添加一个或多个成员
  - `SREM <key> <member1> <member2> ...`: 移除集合中的一个或多个成员
  - `SCARD <key>`: 获取集合成员数
  - `SISMEMBER <key> <member>`: 判断member是否在集合中
  - `SMEMBERS <key>`: 获取集合中的所有成员
  - `SMOVE <source_key> <destination_key> <member>`: 将member从集合source移动到destination
  - `SDIFF <key1> <key2> ...`: 获取给定集合的差集
  - `SDIFFSTORE <destination_key> <key1> <key2> ...`: 获取指定集合的差集，并将结果记录在集合destination_key中
  - `SINTER <key1> <key2> ...`: 获取指定集合的交集
  - `SINTERSTORE <destination_key> <key1> <key2> ...`: 获取指定集合的交集，并将结果记录在集合destination_key中
  - `SUNION <key1> <key2>`: 返回给定集合的并集
  - `SUNIONSTORE <destination_key> <key1> <key2>...`: 获取指定集合的并集，并将结果存储到集合destination_key中

- #### 有序集合Sorted Set
  Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。有序集合的成员是唯一的,但分数(score)却可以重复。
  - `ZADD <key> <score1> <member1> <score2> <member2>`: 向有序集合添加一个或多个成员，或者更新已存在成员的分数
  - `ZCARD <key>`: 获取有序集合的成员数
  - `ZCOUNT <key> <min_score> <max_score>`: 获取有序集合中分数在min到max之间的成员的个数
  有序集合还包含求
### 发布订阅
- `PUBSUB CHANNELS`: 查看所有活跃频道
- `SUBSCRIBE <chanel1> <chanel2>...`: 订阅频道
- `PUBLISH <chanel> <message>`: 向指定频道发布信息
- `UNSUBSCRIBE <chanel1> <chanel2>...`: 退订指定频道
- `PSUBSCRIBE <pattern1> <pattern2>...`: 订阅符合给定模式的频道（例如news.*）表示所有以news.开头的频道
- `PUNSUBSCRIBE <pattern1> <pattern2>`: 退订符合给定模式的频道

### 事务
- `MULTI`: 标记一个事务块的开始
- `EXEC`: 执行事务块内的所有命令
- `WATCH <key1> <key2> ...`: 监听key值，如果在事务执行之前监听的key被改变了，则事务被打断
- `UNWATCH`: 取消监听所有的key
- `DISCARD`: 取消事务

### 脚本
- `EVAL "<lua_script>" <num_of_keys> <key1> <key2>... <argv1> <argv2>...`: 执行lua脚本
  - lua_script： 参数是一段 Lua 5.1 脚本程序
  - num_of_keys： 用于指定键名参数的个数。
  - key： 从 EVAL 的第三个参数开始算起，表示在脚本中所用到的那些 Redis 键(key)，这些键名参数可以在 Lua 中通过全局变量 KEYS 数组，用 1 为基址的形式访问( KEYS[1] ， KEYS[2] ，以此类推)。
  - argv： 附加参数，在 Lua 中通过全局变量 ARGV 数组访问，访问的形式和 KEYS 变量类似( ARGV[1] 、 ARGV[2] ，诸如此类)。
- `SCRIPT LOAD "<lua_script>"`: 将脚本缓存，但不执行，执行该命令会返回一个sha标识
- `EVALSHA <sha> <num_of_keys> <key1> <key2>... <argv1> <argv2>...`: 执行已缓存的脚本
- `SCRIPT FLUSH`: 清空脚本缓存

### 其他
- Redis配置：主从模式 / 集群 / 持久化