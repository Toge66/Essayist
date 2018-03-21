#!/bin/bash
echo "file name is '$0'"
echo "\$*=" $*
echo "\"\$*\"=" "$*"

echo "\$@=" $@
echo "\"\$@\"=" "$@"

echo "print each param from \$*"
for var in $*
do
    echo "$var"
done

echo "print each param from \$@"
for var in $@
do
    echo "$var"
done

echo "从 \"\$*\" 获取并打印每一个参数"
for var in "$*"
do
    echo "$var"
done

echo "从 \"\$@\" 获取并打印每一个参数"
for var in "$@"
do
    echo "$var"
done