##yargs使用

###一、常用参数

+ help、epilog提示帮助信息
 
```javascript
#!/usr/bin/env node 
var yargs = require('yargs')

const argv = yargs.usage('Usage: $0 -c[configfile]')
  .help('h')
  .epilog('help help')
  .argv
```

+ demand指定必选参数
 
```javascript
#!/usr/bin/env node 

var yargs = require('yargs')
yargs.usage('Usage: $0 -c[configfile]')
  .demand(['c'])
  .argv
```

+ default参数默认值
 
```javascript
#!/usr/bin/env node 

var yargs = require('yargs')
const argv = yargs.usage('Usage: $0 -c[configfile]')
  .demand(['c'])
  .default('c', 'config.js')
  .argv

console.log(argv.c)
```

+ alias提示帮助信息
 
```javascript
#!/usr/bin/env node 
var yargs = require('yargs')

const argv = yargs.usage('Usage: $0 -c[configfile]')
  .help('h')
  .epilog('help help')
  .alias('c', 'config')
  .argv
console.log(argv.c)
console.log(argv.config)
```
+ array参数数组
 
```javascript
#!/usr/bin/env node 
var yargs = require('yargs')

const argv = yargs.usage('Usage: $0 -c[configfile]')
  .help('h')
  .epilog('help help')
  .alias('c', 'config')
  .array('c')
  .argv
console.log(argv.c)
console.log(argv.config)

调用：node self.js -c file1 file2
```
+ choices指定参数范围
 
```javascript
#!/usr/bin/env node 
var yargs = require('yargs')

const argv = yargs.usage('Usage: $0 -c[configfile]')
  .describe('c', 'choose your sandwich ingredients')
  .choices('c', ['file1', 'file2', 'file3'])
  .argv

console.log(argv.c)
```
###二、子命令
+ command使用`//.command(cmd, desc, [builder], [handler])`

```
#!/usr/bin/env node

var yargs = require('yargs')

const argv = yargs
  .command('build',
    'build file',
    (ya) => {
      ya.option('config',
        {
          alias: 'c',
          demand: true,
          describe: 'appoint a config file'
        })
    },
    (argv) => {
      console.log(argv.c)
    })
  .argv
  
调用：node self.js build -c abc
```
> .command(cmd, desc, [module])
> 
> .command(module)

也可以把这个命令单独放到一个文件里

```
//build.js
exports.command = 'build'

exports.desc = 'build file'

exports.builder = function (yargs) {
  return yargs
    .option('config', {
      alias: 'c',
      demand: true,
      describe: 'appoint a config file'
    })
}

exports.handler = function (argv) {
  console.log(argv.c)
}

//self.js
#!/usr/bin/env node

//.command(cmd, desc, [builder], [handler])
var yargs = require('yargs')

const argv = yargs
  .command(require('./build'))
  .argv
```

+ commandDir使用

```
.
├── commond
│   ├── build.js
│   └── dev.js
└── self.js

//build.js
exports.command = 'build'

exports.desc = 'build file'

exports.builder = function (yargs) {
  return yargs
    .option('config', {
      alias: 'c',
      demand: true,
      describe: 'appoint a config file'
    })
}

exports.handler = function (argv) {
  console.log('build====' + argv.c)
}

//dev.js
exports.command = 'dev'

exports.desc = 'run developer'

exports.builder = function (yargs) {
  return yargs
    .option('config', {
      alias: 'c',
      demand: true,
      describe: 'appoint a config file'
    })
}

exports.handler = function (argv) {
  console.log('dev====' + argv.c)
}

调用：node self.js build -c abc
	  node self.js dev -c abc

```





































