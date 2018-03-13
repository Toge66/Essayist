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

