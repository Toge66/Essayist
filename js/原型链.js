console.log("=========对象=========");
(()=> {
//	"use strict"
	const person = {}
	Object.defineProperty(person,'name',{writable:false,value: "Tome"})
	console.log(person.name);
	person.name = "aa"
	console.log(person.name);
	
	Object.defineProperty(person,'age',{configurable:false,value:28})
	console.log(person.age);
	delete person.age
	console.log(person.age);
	
	var book = {
		_year:2004,
		edition:1
	}
//	Object.defineProperty(book,"year",{
//		get: () => {
//			return this._year
//		},
//		set: (newValue) => {
//			if (newValue > 2004) {
//				this._year = newValue
//				this.edition += newValue - 2004
//			}
//		}
//	})
	
//	book.year = 2005
//	
//	console.log(book.year);
//	console.log(book.edition);
	
	book.__defineGetter__("year", () => {
		return this._year
	})
	book.__defineSetter__("year", (newValue) => {
		if (newValue > 2004) {
			this._year = newValue
			this.edition += newValue - 2004
		}
	})
	book.year = 2007
	console.log(book.year);
	console.log(book.edition);
})()

console.log("\n\n\n=========构造函数模式=========\n");
(()=> {
	function Person(name,age) {
		this.name = name
		this.age = age
		this.sayName = function () {
			console.log(this.name);
		}
	}
	
	const p1 = new Person("tome",28)
	p1.sayName()
	
	const p2 = new Person("Haha", 23)
	p2.sayName()
	
	console.log(p1.sayName === p2.sayName);
	
	/*
	构造函数弊端：
	上面两个创建的两个对象中sayName函数都是单独创建的浪费空间，解决方案
	1、将方法从构造函数中移到外边来解决如下
	*/
	
	function Person1(name,age) {
		this.name = name
		this.age = age
		this.sayName = sayName
	}
	function sayName() {
		console.log(this.name);
	}
	
	const p3 = new Person1("hello",22)
	p3.sayName()
	
	const p4 = new Person1("aaaa",21)
	p4.sayName()
	
	console.log(p3.sayName === p4.sayName);
	
	/*
	弊端
	将共有方法移到构造函数外边，如果方法特别多的话的就会定义好多的全局函数，
	导致这个自定的引用类型没有封装性了
	2、原型链
	*/
	
})()

console.log("\n\n\n=========原型链=========\n");
(()=> {
	"use strict"
	function Person() {
	}
	Person.prototype.name = "原型链"
	Person.prototype.desc = "存储特定类型实例的共有的属性和方法"
	Person.prototype.sayDesc = function () {
		console.log(this.desc);
	}
	
	const p1 = new Person()
	p1.name = "haha"
	console.log(p1.name);
	p1.sayDesc()
	
	const p2 = new Person()
	console.log(p2.name);
	p2.sayDesc()
	
	console.log("\n");
	console.log(Person.prototype.isPrototypeOf(p1));
	console.log(Person.prototype.isPrototypeOf(p2));
	console.log(Object.getPrototypeOf(p1) === Person.prototype);
	console.log(Object.getPrototypeOf(p2).name);
	console.log("\n");
	console.log(p1.hasOwnProperty("name"))
	console.log("name" in p1);
	console.log(p2.hasOwnProperty("name"))
	console.log("name" in p2)
	Person.prototype.sayDesc = function () {
		console.log("Hi");
	}
	p2.sayDesc()
	
	console.log("\n");
	console.log(p2 instanceof Person);
	console.log(p2.constructor === Person)
	console.log(p2.constructor == Object);
	Person.prototype = {
		name:"重新赋值",
		desc:"重新赋值后constructor不会指向原实例类型了，而是指向Object了需要谨慎"
	}
	const p3 = new Person()
	console.log(p3.name)
	console.log(p3.desc)
	console.log(p3 instanceof Person);
	console.log(p3.constructor == Person);
	console.log(p3.constructor == Object);
	/*
	弊端：
	如果引用类型的属性放在原型链上，当修改这个属性是，会对所有使用此类型的实例都会产生影响，
	大多数情况是构造函数和原型模式混合使用
	*/
	
})()

console.log("\n\n\n========构造函数和原型链混合使用========\n");
(()=> {
	function Person(name, age) {
		this.name = name,
		this.age = age,
		this.friends = ["Shelby","Court"]
	}
	Person.prototype = {
		constructor:Person,
		sayName:function () {
			console.log(this.name);
		}
	}
	
	const p1 = new Person("Tom",28)
	const p2 = new Person("Lily",26)
	
	p1.friends.push("Van")
	console.log(p1.friends);
	console.log(p2.friends);
	console.log(p1.friends === p2.friends);
	console.log(p1.sayName === p2.sayName);
	
	
})()

console.log("\n\n\n=========寄生构造函数模式=========\n");
(()=> {
	function Person(name,age) {
		const o = new Object()
		o.name = name
		o.age = age
		o.sayName = function () {
			console.log(this.name);
		}
		return o
	}
	
	const p1 = new Person("tome",28)
	p1.sayName()
	
	console.log("\n-----特殊数组----");
	function SpecialArray() {
		const a = new Array()
		
		a.push.apply(a, arguments)
		a.pipedString = function () {
			return this.join(',')
		}
		return a
	}
	
	const array = new SpecialArray("red","blue","green")
	console.log(array);
	console.log(array.pipedString());
})()

console.log("\n\n\n=========原型链实现=========\n");
(()=> {
	function SuperType() {
		this.property = true
	}
	SuperType.prototype.getSuperValue = function () {
		return this.property
	}
	
	function SubType() {
		this.subproperty = false
	}
	SubType.prototype = new SuperType()
	SubType.prototype.getSubValue = function () {
		return this.subproperty
	}
	const instance = new SubType()
	console.log(instance.getSuperValue());
	console.log(instance.constructor === SuperType);
	console.log(instance.constructor === SubType);
	console.log(instance instanceof SubType);
	console.log(instance instanceof SuperType);
	console.log(instance instanceof Object);
	console.log(Object.prototype.isPrototypeOf(instance));
	console.log(SuperType.prototype.isPrototypeOf(instance));
	console.log(SubType.prototype.isPrototypeOf(instance));
})()
console.log("\n\n\n=========借用构造函数=========\n");
(()=> {
	function SuperType() {
		this.colors = ["red","blue","green"]
	}
	
	function SubType() {
		SuperType.call(this)
	}
	
	const i1 = new SubType()
	i1.colors.push('black')
	console.log(i1.colors);
	
	const i2 = new SubType()
	console.log(i2.colors);
	
})()

console.log("\n\n\n=========原型式继承=========\n");
(()=> {
	
	function object(o) {
		function F() {}
		F.prototype = o
		return new F()
	}
	
	const person = {
		name:'hah',
		friends:['aa','bb','cc']
	}
	
	const p1 = object(person)
	p1.name = "p1"
	p1.friends.push('p1')
	console.log(p1.friends);
	
	const p2 = object(person)
	p2.name = "p2"
	p2.friends.push('p2')
	console.log(p2.friends);
	console.log(person.friends);
	
	console.log('-----相同------');
	
	const p3 = Object.create(person)
	p3.name = "p3"
	p3.friends.push('p3')
	console.log(p3.friends);
	
	const p4 = object(person)
	p4.name = "p4"
	p4.friends.push('p4')
	console.log(p4.friends);
	console.log(person.friends);
	
})()

console.log("\n\n\n=========寄生式继承=========\n");
(()=> {
	function object(o) {
		function F() {}
		F.prototype = o
		return new F()
	}
	function createAnother(original) {
		const clone = object(original)
		clone.sayHi = function () {
			console.log("hi");
		}
		return clone
	}
	
	const person = {
		name:'hah',
		friends:['aa','bb','cc']
	}
	
	const p1 = createAnother(person)
	p1.sayHi()
	
})()

console.log("\n\n\n========寄生组合式继承==========\n");
(()=> {
	
	function object(o) {
		function F() {}
		F.prototype = o
		return new F()
	}
	
	function inheritPrototype(subType, superType) {
		const prototype = object(superType.prototype)
		prototype.constructor = subType
		subType.prototype = prototype
	}
	
	function SuperType(name) {
		this.name = name
		this.color = ["red",'blue','green']
	}
	
	SuperType.prototype.sayName = function () {
		console.log(this.name);
	}
	
	function SubType(name, age) {
		SuperType.call(this,name)
		this.age = age
	}
	
	inheritPrototype(SubType, SuperType)
	
	SubType.prototype.sayAge = function () {
		console.log(this.age);
	}
	
	const p1 = new SubType('haha',29)
	p1.sayName()
	p1.sayAge()
	
	"这个例子的高效率体现在它只调用了一次SuperType构造函数，并且因此避免了在SubType.prototype上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用instanceof和isPrototypeOf()。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式"
	
})()
































