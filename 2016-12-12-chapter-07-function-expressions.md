# 函数表达式

函数声明和函数表达式方式。

```js
function functionName(arg0, arg1, arg2) {
    //函数体
}

var functionName = function(arg0, arg1, arg2){
    //函数体
};
```

**递归**：

在前面也已经展示过了，可以用arguments.callee()代替函数名。

```js
function factorial(num){
	if (num <= 1){
		return 1;
	} else {
		return num * factorial(num-1);
	}
}

var anotherFactorial = factorial;
factorial = null;
alert(anotherFactorial(4)); //error!

function factorial(num){
	if (num <= 1){
		return 1;
	} else {
		return num * arguments.callee(num-1);
	}
}
```


**闭包 closures**：

闭包指有权访问另一个函数作用域中的变量的**函数**；记住，闭包是一个函数，这个函数可以访问另一个函数的变量。


下面返回值虽然是个函数，但是却仍然可以访问propertyName变量。因为内部函数(闭包)的作用域链中包含createComparisonFunction的作用域。

```js
function createComparisonFunction(propertyName) {
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
			if (value1 < value2){
				return -1;
			} else if (value1 > value2){
				return 1;
			} else {
				return 0;
		}
	};
}
```

当调用函数的时候，会为函数创建一个执行环境，并将**该环境的活动对象加入到作用域链的前端**，全局的变量对象在最前端。作用域链本质上是一个指向变量对象的**指针列表**，它只引用但不实际包含变量对象。


**闭包只能取得包含外部函数中变量的最后一个值**。和直接赋值不同，在获取变量值时才执行闭包函数。

下面这个函数返回的函数数组中的每个函数都会返回10。因为每个函数的作用域链中都保存着createFunctions()的活动对象，所以它们引用的都是同一个变量i。当createFunctions()返回后，i的值是10，所以每个函数引用保存的变量i都是10。

可以从**块级作用域的角度**去分析，因为js没有块级作用域，因此在执行完后i的值是10，我们为result[i]复制时，将其设置为匿名函数，去访问result[i]的时候才返回i的值。而函数执行完后，i的值已经是10了。


```js
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(){
            return i;
        };
    }
    return result;
}
```

可以通过加入另一个匿名函数来修正这个问题，我们在调用result[i]的时候，此时i传入这个function(num)函数中，函数参数是按值传递的，所以**i的值会复制给num**。而内部又创建了返回num的闭包，因此能够正常访问。这样的做法其实是复制值，而不是访问外部函数的变量。

```js
function createFunctions(){
    var result = new Array();
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    }
    return result;
}
```

**闭包中使用this的问题**

this对象是运行时基于函数的执行环境绑定的。在全局中是window,当函数被某个对象调用时，this就是这个对象。但是匿名函数的执行环境具有全局性，因此this是指向window，而不是某个对象(除非使用apply或call)。

```js
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()()); //"The Window"（在非严格模式下）
```

为什么匿名函数没有包含最靠近它的外部作用域的this对象呢？从下面的转换中可以看出object.getNameFunc()调用后返回的是someFunction函数，然后再去调用someFunction函数，而这个函数是被window调用的。

```js
// 等同于
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return someFunction；
        };
    }
};

function someFunction(){
	return this.name;
}

```

可以通过将外部作用域的this保存在一个闭包能够访问到的变量里，就可以让闭包访问对象了。


```js
var name = “The Window”;
var object = {
	name : “My Object”,
	getNameFunc : function(){
		var that = this;
		return function(){
			return that.name;
		};
	}
};
alert(object.getNameFunc()()); //”My Object”
```

在不是使用闭包的时候，this是指向对象本身。

```js
var name = “The Window”;
	var object = {
	name : “My Object”,
	getName: function(){
		return this.name;
	}
};

object.getName(); //”My Object”
(object.getName)(); //”My Object”
(object.getName = object.getName)(); //”The Window” 非严格模式下
```



**模仿块级作用域**：

JS没有块级作用域，如果要重新使用变量，需重新声明:

```js
function outputNumbers(count){
	for (var i=0; i < count; i++){
		alert(i);
	}
	var i; //variable redeclared
	alert(i); //count
}
```

可以使用匿名函数模仿块级作用域(因为变量所在执行环境是这个匿名函数，所以不会污染到全局) 语法如下：

```js
//正确
(function(){

)();
```

括号内的函数其实是函数表达式，只是说省略了函数表达式的变量名并直接调用了, 相当于下面这段代码，作用是一样的。
但是不可以省略括号，因为js会把function关键字当作是函数声明的开始，函数声明后面是不能加圆括号的。

```js
var someFunction = function(){
	//block code here
};
someFunction();

//错误
function(){
	//block code here
}();
```

在需要临时变量时，只需要包在这里面就可以了。

```js
function outputNumbers(count){
	(function () {
		for (var i=0; i < count; i++){
			alert(i);
		}
	})();
	alert(i); //外部不能再调用
}
```

这种技术通常在全局作用域中被用于函数外部，从而限制向全局作用域中添加过多的变量和函数。一般来说，我们也应该尽量少向全局函数中添加变量和函数。


**私有变量**：

JavaScript中没有私有成员的概念，所有对象的属性都是共有的，但是有私有变量的概念。在函数中定义的变量都是私有变量。**特权方法**指的是有权访问私有变量和私有函数的公有方法。

创建特权方法的方式有两种，一种是在构造函数中定义：特权方法作为闭包有权访问这些变量和函数。

```js
function MyObject(){
	//private variables and functions
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//privileged methods 特权方法
	this.publicMethod = function (){
		privateVariable++;
		return privateFunction();
	};
}
```

利用私有和特权成员，可以隐藏不应该被直接修改的数据。私有变量name只能通过两个闭包去访问。但是构造函数模式的缺点是必须使用构造函数模式达到这个目的，而且针对每个实例都会创建一组同样的新方法，而有时我们却是需要创建公有方法的，可以使用静态私有变量实现特权方法。

```js
function Person(name){
	this.getName = function(){
		return name;
	};
	this.setName = function (value) {
		name = value;
	};
}
var person = new Person(“Nicholas”);
alert(person.getName()); //”Nicholas”
person.setName(“Greg”);
alert(person.getName()); //”Greg”
```

**静态私有变量**private static：通过在私有作用域中定义私有变量或函数，也可以创建特权方法。下面的代码中，MyObject没有加上var，因为希望它被全局使用。静态私有变量的私有变量和函数是实例共享的。以这种方式创建静态私有变量会因为使用原型而增加代码复用，但是每个实例却失去了自己的私有变量。所有到底是使用实例变量还是静态私有变量，还是要看需求而定。

```js
(function(){
	//私有变量和函数
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//构造函数
	MyObject = function(){
	};
	//公有/特权方法
	MyObject.prototype.publicMethod = function(){
		privateVariable++;
		return privateFunction();
	};
})();


(function(){
	var name = “”;
	Person = function(value){
		name = value;
	};
	Person.prototype.getName = function(){
		return name;
	};
	Person.prototype.setName = function (value){
		name = value;
	};
})();
var person1 = new Person(“Nicholas”);
alert(person1.getName()); //”Nicholas”
person1.setName(“Greg”);
alert(person1.getName()); //”Greg”
var person2 = new Person(“Michael”);
alert(person1.getName()); //”Michael”//person1也被改变了
alert(person2.getName()); //”Michael”
```


**模块模式**：模块模式是为单例创建私有变量和特权方法。JavaScript中以对象字面量的方式创建单例对象。

```js
var singleton = {
	name : value,
	method : function () {
		//method code here
	}
};
```

模块模式使用一个返回对象的匿名函数，而匿名函数内部，定义了私有变量和函数，将一个对象字面量作为函数的值返回。返回的对象字面量只包含公有的属性和方法。由于这个对象是匿名函数内部定义的，因此它的公有方法有权访问私有变量和函数。

```js
var singleton = function(){
	//private variables and functions
	var privateVariable = 10;
	function privateFunction(){
		return false;
	}
	//privileged/public methods and properties
	return {
		publicProperty: true,
		publicMethod : function(){
			privateVariable++;
			return privateFunction();
		}
	};
}();
```

模块模式在需要对单例进行某些初始化，又需要维护其私有变量时非常有用。

```js
var application = function(){
	//private variables and functions
	var components = new Array();
	//initialization
	components.push(new BaseComponent());
	//public interface
	return {
		getComponentCount : function(){
			return components.length;
		},
		registerComponent : function(component){
			if (typeof component == “object”){
				components.push(component);
			}
		}
	};
}();
```

在Web应用程序中，通常需要一个单例来管理应用程序级的信息。上面的例子创建了用于管理组件的application对象。如果必须创建一个对象并以某些数据对其进行初始化，同又要公开一些能够访问这些私有数据的方法，就可以使用模块模式。

为什么在function(){...}后面总是带多一个()呢？以上面的application为例，如果没有()，那么application实际上是一个函数表达式对象，而不是函数表达式的返回值，而加上了()之后，相当于调用了这个函数表达式，此时application对象才是函数表达式的return的值本身。


**增强的模块模式**：在返回对象之前加入对其增强的代码，这种增强的模块模式适合那些单例必须是某些类型的实例，同时还必须添加某些属性或方法对其加以增加的情况。

```js
var application = function(){
	//私有变量和函数
	var components = new Array();
	//初始化
	components.push(new BaseComponent());
	//创建application的一个局部副本
	var app = new BaseComponent();
	//公有方法和属性
	app.getComponentCount = function(){
		return components.length;
	};
	app.registerComponent = function(component){
		if (typeof component == “object”){
		components.push(component);
		}
	};
	//返回app
	return app;
}();
```

