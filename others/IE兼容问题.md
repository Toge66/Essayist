# IE兼容小结
## SSE问题
安装中间件[`event-source-polyfill`](https://github.com/Yaffle/EventSource)
在`webpack.config.js & webpack.build.js`添加

```
const files = {
  'event-source-polyfill': {path: 'node_modules/event-source-polyfill/src/eventsource.min.js',}
};
```

模版文件`index.hbs`添加

```
<script>
  window.onload = function () { //修正ie10中 SSE XDomainRequest有值的情况
      var ee2 = document.createElement('script')
      ee2.src = 'eventsource.min.js'
      document.head.appendChild(ee2)
  }

</script>
```
## [IE跨域访问问题：](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide/console/error-and-status-codes)    SEC7121

	response中的Access-Control-Allow-Origin的值要和请求头中origin的值要匹配
	
	服务端设置：reponse的标头
	
	Access-Control-Allow-Credentials: true
	
	Access-Control-Allow-Origin
	
	Access-Control-Allow-Headers
	
	Access-Control-Allow-Headers的列表中不存在请求标头的错误：服务端的Access-Control-Allow-Headers中添加对应字段

## JS默认静态变量不能继承，但是用bable转译后可以实现，下面是babel转译后实现的代码
```
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; //这里实现静态变量继承
}
```
> ES6中使用`Object.setPrototypeO`f实现，ES5-使用`__proto__`=`superclass`实现

但是`Object.setPrototypeOf`是ES6的语法IE11才支持，`__protp__`IE11才支持，所以在IE10上不能实现静态属性的继承

解决方案：

* 添加一个polyfill

	```
	(function() {
	  var testObject = {};
	  if (!(Object.setPrototypeOf || testObject.__proto__)) {
	      var nativeGetPrototypeOf = Object.getPrototypeOf;
	      Object.getPrototypeOf = function(object) {
	          if (object.__proto__) {
	              return object.__proto__;
	          } else {
	              return nativeGetPrototypeOf.call(Object, object);
	          }
	      }
	  }
	})()
	```
* 在`.babelrc`中添加插件
	
	```
	{
	  "presets": ["react", "es2015"],
	  "plugins": [
	    ["transform-es2015-classes", { "loose": true }],
	    "transform-proto-to-assign"
	  ]
	}
	```

## IE缓存问题导致的没有及时刷新的问题
在请求头中添加`{ 'pragma': 'no-cache', 'cache-control': 'no-cache' }`[链接](https://medium.com/@tiboprea/how-to-fix-internet-explorer-caching-of-ajax-requests-using-angular-5-2c489cf2d1f7)

## Ie10没有[window.location.orign](https://tosbourn.com/a-fix-for-window-location-origin-in-internet-explorer/)
	
	
	if (!window.location.origin) {
	 window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''); 
     }
