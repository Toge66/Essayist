##循环语句
shell中也支持`break`跳出循环, `continue`跳出本次循环.

####for

```
#! /bin/sh
for (( i=0; i<10; i++)); do
	touch test_$i.txt
done
```
```
#! /bin/sh
for name [in list]
do
	...
done
```
其中,[]括起来的 `in list`, 为可选部分, 如果省略`in list`则默认为`in "$@"`, 即你执行此命令时传入的`参数列表`.
看个例子:

```
#! /bin/sh
for file in *.txt
do
	open $file
done
```

####while

```
#! /bin/sh
i=0
while ((i<5));
do
	((i++))
	echo "i=$i"
done
```

####until

```
#! /bin/sh
i=5
until ((i==0))
do
	((i--))
	echo "i=$i"
done
```


##流程控制

####if/else

```
#! /bin/sh
if condition
then 
	 do something
elif condition
then 
	do something
elif condition
then 
	do something
else
	do something
fi
```

事例：

```
#! /bin/sh
a=1
if [ $1=$a ]
then
	echo "you input 1"
elif [ $1=2 ]
then
	echo "you input 2"
else
	#do nothing
	echo " you input $1"
fi
```
> 注意, `[ ]` 两边一定要加空格,`test`命令的另一种形式`/bin/[`
> >[查看其它括号不同使用方法](http://blog.csdn.net/tttyd/article/details/11742241).

```
#! /bin/sh
if test "2>3"
then
	...
fi
```

```
#! /bin/sh
if [ "2>3" ]
then 
	...
fi
```

####switch
```
#! /bin/sh
case expression in
	pattern1)
		do something... ;;
	pattern2)
		do something... ;;
	pattern2)
		do something... ;;
	...
esac
```
>NOTE:
>> 
* `;;`相当于其它语言中的break
* 每个pattern之后记得加`)`
* 最后记得加`esac`

事例：

```
#! /bin/sh
input=$1
case $input in
        1 | 0)
        str="一or零";;
        2)
        str="二";;
        3)
        str="三";;
        *)
        str=$input;;
esac
echo "---$str"
```

##一些关键字

文件判断： | 作用
---------| -------------
-e       | 文件存在
-a       | 文件存在（已被弃用）
-f       | 被测文件是一个regular文件（正常文件，非目录或设备）
-s       | 文件长度不为0
-d       | 被测对象是目录
-b       | 被测对象是块设备
-c       | 被测对象是字符设备
-p       | 被测对象是管道
-h       | 被测文件是符号连接
-L       | 被测文件是符号连接
-S       | 被测文件是一个socket
-t       | 关联到一个终端设备的文件描述符。用来检测脚本的stdin[-t0]或[-t1]是一个终端
-r       | 文件具有读权限，针对运行脚本的用户
-w       | 文件具有写权限，针对运行脚本的用户
-x       | 文件具有执行权限，针对运行脚本的用户
-u       | set-user-id(suid)标志到文件，即普通用户可以使用的root权限文件，通过chmod +s file实现
-k       | 设置粘贴位
-O       | 运行脚本的用户是文件的所有者
-G       | 文件的group-id和运行脚本的用户相同
-N       | 从文件最后被阅读到现在，是否被修改
f1 -nt f2 | 文件f1是否比f2新
f1 -ot f2 | 文件f1是否比f2旧
f1 -ef f2 | 文件f1和f2是否硬连接到同一个文件


整数比较：|    含义			| 使用
---------|---------------|-----------------
-eq      | 等于           |if [ "$a" -eq "$b" ]
-ne      | 不等于         | if [ "$a" -ne "$b" ]
-gt      | 大于           | if [ "$a" -gt "$b" ]
-ge      | 大于等于        | if [ "$a" -ge "$b" ]
-lt      | 小于           | if [ "$a" -lt "$b" ]
-le      | 小于等于        | if [ "$a" -le "$b" ]
<        | 小于（需要双括号）| (( "$a" < "$b" ))
<=       | 小于等于(...)   | (( "$a" <= "$b" ))
>        | 大于(...)      | (( "$a" > "$b" ))
>=       | 大于等于(...)   | (( "$a" >= "$b" ))


字符串比较：|    含义			    | 使用
---------|---------------------|-----------------
= ( == ) | 等于                 		| if [ "$a" = "$b" ]
!=      | 不等于       			 		| if [ "$a" != "$b" ]
<        | 小于          		 		| 小于，在ASCII字母中的顺序：if [[ "$a" < "$b" ]] #需要对<进行转义



