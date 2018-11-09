# rollup.js  


> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码.  
> 
> Rollup 对代码模块使用ES6标准化格式.
> 
> Rollup使项目不必携带其他未使用的代码.

## JS 模块化规范
>

### IIFE
> 自执行函数，可通过 \<script\> 标签加载
> 
>

```js
var counter = (function() {
  var i = 0;
  return {
    get: function() {
      return i;
    },
    set: function(val) {
      i = val;
    },
    increment: function() {
      return ++i;
    }
  };
})();

```
[详解立即执行函数表达式IIFE](https://juejin.im/entry/58a093ed570c35005777b08d/)
### common.js

> Node 默认的模块规范, 可通过 Webpack 加载  
> 
> 认为每个文件就是一个模块，通过exports导出  

```js
exports.foo = "bar";
module.exports = { foo: "bar" };
const util = require("foo");

exports = module.exports = { foo: "bar" };

```

- tips:

  <ol>
  <li>module.exports 初始值为一个空对象 {}</li>
  <li>exports 是指向的 module.exports 的引用</li>
  <li>require() 返回的是 module.exports 而不是 exports</li>
  </ol>

- 优点：
   <ol>
  <li>所有代码都运行在模块作用域，不会污染全局作用域；</li>
  <li>模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存；</li>

   </ol>
- 缺点
  <ol>
    <li>浏览器不支持</li>
  </ol>
  

### AMD（Asynchronous Module Definition）和 require.js

> 浏览器端的模块规范, 可通过 RequireJS 可加载  
> 实现了异步加载不会阻塞浏览器

```js
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main" />;

/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    jquery: "jquery.min", //实际路径为js/lib/jquery.min.js
    underscore: "underscore.min"
  }
});
// 执行基本操作
require(["jquery", "underscore"], function($, _) {
  // some code here
});
```

引用模块的时候，我们将模块名放在[]中作为 reqiure()的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在[]中作为 define()的第一参数。

```js
/** 网页中引入require.js及main.js **/
// 定义math.js模块
define(function() {
  var basicNum = 0;
  var add = function(x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum: basicNum
  };
});
// 定义一个依赖underscore.js的模块
define(["underscore"], function(_) {
  var classify = function(list) {
    _.countBy(list, function(num) {
      return num > 30 ? "old" : "young";
    });
  };
  return {
    classify: classify
  };
});

// 引用模块，将模块放在[]内
require(["jquery", "math"], function($, math) {
  var sum = math.add(10, 20);
  $("#sum").html(sum);
});
```

### CMD 和 sea.js

> CMD 是另一种 js 模块化方案，它与 AMD 很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行。此规范其实是在 sea.js 推广过程中产生的。

```js
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) {
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没用到某个模块 b，但 b 还是提前执行了
    b.doSomething();
  }
});

/** CMD写法 **/
define(function(require, exports, module) {
  var a = require("./a"); //在需要时申明
  a.doSomething();
  if (false) {
    var b = require("./b");
    b.doSomething();
  }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
  var $ = require("jquery.js");
  var add = function(a, b) {
    return a + b;
  };
  exports.add = add;
});
// 加载模块
seajs.use(["math.js"], function(math) {
  var sum = math.add(1 + 2);
});
```


### UMD
> 兼容 IIFE, AMD, CJS 三种模块规范

```js
(function(window, factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    window.eventUtil = factory();
  }
})(this, function() {
  //module ...
});
```

### ES6

> ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：export 和 import。export 命令用于规定模块的对外接口，import 命令用于输入其他模块提供的功能。

```js
/** 定义模块 math.js **/
var basicNum = 0;
var add = function(a, b) {
  return a + b;
};
export { basicNum, add };

/** 引用模块 **/
import { basicNum, add } from "./math";
function test(ele) {
  ele.textContent = add(99 + basicNum);
}

/** export default **/
//定义输出
export default { basicNum, add };
//引入
import math from "./math";
function test(ele) {
  ele.textContent = math.add(99 + math.basicNum);
}
```



#### ES6 模块与 CommonJS 模块的差异

 <ol>
 <li>CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。</li>

- CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令 import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的 import 有点像 Unix 系统的“符号连接”，原始值变了，import 加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块

 <li>CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。</li>
 
- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。  
- 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。
 </ol>
 
 ## 使用教程
 > 使用 npm install --global rollup 进行安装  
 > 通过命令行调用   
 
```js
npm install rollup -g

rollup main.js --file ./distR/bundle-iife.js --format iife --name variable 
rollup main.js --file ./distR/bundle-cjs.js --format cjs 
rollup main.js --file ./distR/bundle-umd.js --format umd

```

 > 通过 JavaScript API来调用 
 

commonJS 实现

```js
npm install rollup-plugin-commonjs -D

rollup main-require.js --file ./distR/bundle-require-iife.js --output.format iife 

```


react-demo   

```js
npm install rollup-plugin-node-resolve rollup-plugin-babel rollup-plugin-node-globals rollup-plugin-postcss -D

npm install @babel/core @babel/plugin-external-helpers @babel/preset-env @babel/preset-react -D
```

### 基础插件 
- rollup-plugin-alias: 提供 modules 名称的 alias 和 reslove 功能.
- rollup-plugin-babel: 提供 Babel 能力, 需要安装和配置 Babel (这部分知识不在本文涉及)  
- rollup-plugin-eslint: 提供 ESLint 能力, 需要安装和配置 ESLint 
- rollup-plugin-node-resolve: 解析 node_modules 中的模块
- rollup-plugin-commonjs: 转换 CJS -> ESM, 通常配合上面一个插件使用
- rollup-plugin-replace: 类比 Webpack 的 DefinePlugin , 可在源码中通过 process.env.NODE_ENV 用于构建区分 Development 与 Production 环境.  
- rollup-plugin-filesize: 显示 bundle 文件大小
-  rollup-plugin-uglify: 压缩 bundle 文件
-  rollup-plugin-serve: 类比 webpack-dev-server, 提供静态服务器能力







## 为什么选择 Rollup
   <ol>
   <li>Tree Shaking: 自动移除未使用的代码, 输出更小的文件</li>
   <li>Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高</li>
   <li>Config 文件支持通过 ESM 模块格式书写</li>
   <li>文档精简</li>  
   <li>可以一次输出多种格式:</li>  
   
   - 不用的模块规范: IIFE, AMD, CJS, UMD, ESM
   - Development 与 production 版本: .js, .min.js  
   </ol>


# 总结
借助于 Rollup 的插件体系, 我们也可以处理 css, images, font 等资源，适合构建Libary.  

但是 Rollup 不支持代码拆分(Code Splitting)和运行时态加载(Dynamic Import) 特性, 所以较少的应用于 Application 开发.
# Webpack 打包模式


- commonJs 模式

[webpack模块化原理-commonjs](https://segmentfault.com/a/1190000010349749)

- ES6 模式  

[
webpack模块化原理-ES module](https://segmentfault.com/a/1190000010349749)