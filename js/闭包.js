console.log("\n\n\n=========闭包问题=========\n");
(()=> {
	function createCompareFunction(propertyName) {
		return function (value1, value2) {
			const v1 = value1[propertyName]
			const v2 = value2[propertyName]
			
			console.log(`v1: ${v1}`);
			console.log(`v2: ${v2}`);
		}
	}
	
	let compare = createCompareFunction('name') 
	const res = compare({name:"hhaah"},{name:"shdofo"})
	
	//解除匿名函数，释放内存
	compare = null
	
})()

console.log("\n\n\n=========闭包和变量var=========\n");
(()=> {
	function createFunction() {
		const result = []
		for (var i = 0; i<5; i++) {
			result[i] = function () {
				return i
			}
		}
		return result
	}
	
	const r = createFunction()
	r.forEach(a => {
		console.log(a());
	})
	console.log("---------防止变量提升或用let-----------\n");	
	function createFunction1() {
		const result = []
		for (var i = 0; i<5; i++) {
			result[i] = function (num) {
				return function () {
					return num
				}
			}(i)
		}
		return result
	}
	
	const r1 = createFunction1()
	r1.forEach(a => {
		console.log(a());
	})
	
})()

console.log("\n\n\n=========模块模式1=========\n");
(()=> {
	function BaseComponent() {
	}
	//控制私有变量不被外边直接访问
	var application = function () {
		var components = new Array()
		components.push(new BaseComponent())
		return {
			getComponentCount: function () {
				return components.length
			},
			
			setComponents: function (component) {
				if (typeof component === 'object') {
					components.push(component)
				}
			}
		}
	}()
	
	console.log(application.getComponentCount());
	
	application.setComponents(new BaseComponent())
	console.log(application.getComponentCount());
	
})()

console.log("\n\n\n=========模块模式2=========\n");
(()=> {
	function BaseComponent() {
	}
	//控制私有变量不被外边直接访问
	var application = function () {
		var components = new Array()
		components.push(new BaseComponent())
		
		const app = new BaseComponent()
		
		app.getComponentCount = function () {
			return components.length
		}
		app.setComponents = function (component) {
			if (typeof component === 'object') {
				components.push(component)
			}
		}
		return app
	}()
	
	console.log(application.getComponentCount());
	
	application.setComponents(new BaseComponent())
	console.log(application.getComponentCount());
	
})()





















