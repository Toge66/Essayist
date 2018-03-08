console.log("\n\n\n=========函数表达式=========\n");
(()=> {
	//函数声明式，变量提升
	sayHi()
	function sayHi() {
		console.log('hi');
	}
//	出错误：函数表达式
//	sayHello()
//	const sayHello = function () {  //匿名函数
//		console.log('hello');
//	}
	
})()

console.log("\n\n\n=========函数递归=========\n");
(()=> {
	
	function factorial(num) {
		if (num <= 1) {
			return 1;
		}
		return num * factorial(num - 1)
	}
	
	console.log(factorial(3))
	
	//错误情况
//	const a = factorial
//	factorial = null
//	console.log(a(3));

//解决问题1、使用arguments.callee方法，但是在严格模式下会不能通过脚本访问arguments.callee方法

	function factorial1(num) {
		if (num <= 1) {
			return 1;
		}
		return num * arguments.callee(num - 1)
	}
	
	//正常
	const a1 = factorial1
	factorial1 = null
	console.log(a1(3));
//解决问题2、使用命名函数表达式
	let factorial2 = (function f(num) {
		if (num <= 1) {
			return 1;
		}
		return num * f(num - 1)
	})
	
	const a2 = factorial2
	factorial2 = null
	console.log(a1(3));
	
})()























