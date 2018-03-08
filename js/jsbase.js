console.log("\n\n\n==================\n");
(()=> {
	let a = [{name:"sjd",age:1},{name:"sjd",age:2},{name:"sjd",age:3}]

	console.log(a[0]);
	console.log(a);

	let b = null

	let c = {}

	console.log(Boolean(b));
	console.log(Boolean(c));

	let aa = 0.1
	let bb = 0.2

	if (aa + bb === 0.3) {
		console.log('=====:0.3');
	}

	console.log(aa + bb);


	let cc = 3
	cc -=   cc

	console.log(cc);


	if (true) {
		var color = 'blue'
	}

	console.log(color);


	const array = [3,4,78,98]

	array.splice(1, 0,"ds",'sdf',900)

	console.log(array);

	const date = new Date()


	let test = [0.02,20.00,20.00]

	let result = test.reduce((sum, next) => sum + next)

	console.log(result);



	console.log("==================");

	var re = null,i;
	for (i = 0; i < 10; i++) {
		re = /cat/g
	    re.test('catastsdfjs')
		console.log(re.test('catastsdfjs'));
	}

	for (i = 0; i < 10; i++) {
		re = new RegExp("cat","g")
	//	re.test('catastsdfjs')
		console.log(re.test('catastsdfjs'));
	}
	
	let n = new Date()
	console.log(moth：n.getMonth());
	console.log(date：n.getDate());
	
})()


console.log("\n\n\n=========Reg正则=========\n");
(()=> {
	var re = /[cb]at/g
	console.log(re.source);
	console.log(re.global);
	console.log(re.multiline);
	console.log(re.ignoreCase);
})()


console.log("\n\n\n========Reg正则==========\n");
(()=> {
	var text = "mom and dad and baby"
	var pattern = /mom( and dad( and baby)?)?/gi
	var matches = pattern.exec(text)
	console.log(matches);
	console.log("--------");
	console.log(matches.index);
	console.log(matches.input);
	console.log(matches[0]);
	console.log(matches[1]);
	console.log(matches[2]);
})()


console.log("\n\n\n=========函数参数的callee=========\n");
(()=> {
	function factorial(num) {
		if (num < 1) {
			return 1;
		}
		console.log(arguments);
		return num * factorial(num - 1)
	}
	console.log(factorial(4));
	
	function factorial2(num) {
		if (num < 1) {
			return 1;
		}
		console.log(arguments);
		return num * arguments.callee(num - 1)
	}
	console.log(factorial2(4));
	
	console.log('-----');
	const f1 = factorial
	factorial = function () {
		return 0
	}
	console.log(f1(4));
	
	const f2 = factorial2
	factorial2 = function () {
		return 0
	}
	
	console.log(f2(4));
})()


console.log("\n\n\n=========函数参数=========\n");

(()=> {

	function outer() {
		inner()
	}
	function inner() {
		console.log(inner.caller);
		console.log(arguments.callee.caller);
		console.log(arguments.caller);
	}
	outer()
	
	console.log(outer.length);
})()

console.log("\n\n\n=========this=========\n");
(()=> {
	global.color = 'blue'
	var o = {color:'red'}
	function sayColor() {
		console.log(this.color);
	}
	sayColor()
	o.sayColor = sayColor
	o.sayColor()
})()

console.log("\n\n\n=========string=========\n");
(()=> {
	const str1 = " hello world!! "
	console.log(str1.charAt(16));
	console.log(str1[16]);
	console.log(str1.charCodeAt(2));
	console.log("\n")
	console.log(str1.substr(0,3));
	console.log(str1.substring(1,3));  
	console.log(str1.substring(3,1));
	console.log(str1.slice(2,4));
	console.log("\n");
	console.log(str1.indexOf("o"));
	console.log(str1.lastIndexOf("o"));
	console.log(str1.lastIndexOf("o",6))
	console.log(str1.indexOf("o",6));
	console.log("\n");
	console.log(str1);
	console.log(str1.trim());
	
	const str2 = "cat, bat, sat, fat, beat"
	console.log("\n");
	console.log(str2.replace("at","ont"));
	console.log(str2.replace(/at/g, 'ont'));
	console.log(str2.replace(/(.at)/g,'word($1)'));
	
	const str3 = "<p class=\"greeting\">Hello world!</p>"
	console.log("\n");
	function htmlEscape(text) {
		return text.replace(/[<>"&]/g,(match,pos,originalText) => {
			switch (match) {
				case ">":
					return "&gt:";
					break;
				case "<":
					return "&lt:";
					break;
				case "&":
					return "&gt:";
					break;
				case "\"":
					return "&quot:";
					break;
				default:
					break;
			}
		})
	}
	console.log(htmlEscape(str3));
	
	const str4 = "red,bl:ue,green,yellow"
	console.log("\n");
	console.log(str4.split(','));
	console.log(str4.split(',',2));
	console.log(str4.split(/[^,:]+/g));
})()

console.log("\n\n\n=========排序=========\n");
(()=> {
	const a = ["red","rhd","rhe","blue","green","yellow"]
	console.log(a.sort((a,b) => { return b.localeCompare(a)}));
	
	const aa = ["20","10","2","203","234"]
	console.log(aa.sort((a,b) => {return a.localeCompare(b)}));
	
	console.log(String.fromCharCode(46,47,48,49,65,97));
	
	
})()

console.log("\n\n\n========eval字符串转译成函数==========\n");
(()=> {
//	"use strict"
	const a = "Tom"
	eval("function sayHi(){console.log(`Hi ${a}`)}")
	function aa() {
		sayHi()
	}
	aa()
})()

console.log("\n\n\n=========Math.random=========\n");
(()=> {
	function selectFrom(lowerValue, upperVale) {
		const choices = upperVale - lowerValue + 1
		return Math.floor(Math.random() * choices + lowerValue)
	}
	
	const colors = ["red","blue","green","yellow","gray","purple","pink"]
	const idx = selectFrom(0, colors.length - 1)
	
	console.log(colors[idx]);
})()





