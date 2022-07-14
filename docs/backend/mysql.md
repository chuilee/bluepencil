# mysql

### 性能调优

###### 查看磁盘空间大小

```shell
df -h
或者
df -g
```



###### 执行命令

**explain sql语句**

```sql
explain select * from table_name;
```

type字段

性能优先级 system > const > eq_ref > ref > range > index > all

###### 索引失效

![image-20220130173246407](/Users/chuilee/Library/Application Support/typora-user-images/image-20220130173246407.png)

![image-20220203101805008](/Users/chuilee/Library/Application Support/typora-user-images/image-20220203101805008.png)
