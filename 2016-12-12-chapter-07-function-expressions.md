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

## 递归

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


## 闭包 closures

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

## 闭包中使用this的问题

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

为什么匿名函数没有包含最靠近它的外部作用域的this对象呢？每个函数调用时会自动取得两个特殊变量：this和arguments。内部函数搜索这两个变量时，只会搜索到其活动对象，不可能直接访问外部函数中的这两个变量。可以通过将外部作用域的this保存在一个闭包能够访问到的变量里，就可以让闭包访问对象了。


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