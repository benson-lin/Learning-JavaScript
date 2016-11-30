# 变量、作用域和内存问题


## 变量与数据类型

ECMAScript变量可能包含两种不同数据类型的值：基本类型值和引用类型值。基本类型指的是简单的数据段，而引用类型值指那些可能由多个值构成的对象。基本数据类型是：Undefined、Null、Boolean、Number和String。引用类型的值是保存在内存中的对象。JavaScript不允许直接访问内存中的位置，即不能直接操作对象的内存空间。


**动态属性**：不能给基本类型的值添加属性，只能给引用类型值动态地添加属性。

```js
var person = new Object();
person.name = “Nicholas”;
alert(person.name); //”Nicholas”

var name = “Nicholas”;
name.age = 27;
alert(name.age); //undefined
```


**变量复制**：从一个变量向另一个变量**复制基本类型**值时，两个变量可以参与任意操作而不会相互影响，但从一个变量向另一个变量**复制引用类型**值时，两个变量实际上将引用同一个对象，即改变某一个变量，可就会影响另一个变量。


**函数传参**：ECMAScript中所有函数的参数都是按值传递的。基本类型值的传递如基本类型变量的复制一样，而引用类型则像引用类型变量的复制一样(复制引用)。这方面和Java是一样的。

```js
function addTen(num) {
	num += 10;
	return num;
}
var count = 20;
var result = addTen(count);
alert(count); //20 - no change
alert(result); //30

function setName(obj) {
	obj.name = “Nicholas”;
}
var person = new Object();
setName(person);
alert(person.name); //”Nicholas”

```

**检测类型**：使用typeof，但是如果知道是对象，要检测是什么类型的对象就要用instanceof。如果用instanceof检测既不能类型，将始终返回false。

```js
var s = “Nicholas”;
var b = true;
var i = 22;
var u;
var n = null;
var o = new Object();
alert(typeof s); //string
alert(typeof i); //number
alert(typeof b); //boolean
alert(typeof u); //undefined
alert(typeof n); //object
alert(typeof o); //object

alert(person instanceof Object); //is the variable person an Object?
alert(colors instanceof Array); //is the variable colors an Array?
alert(pattern instanceof RegExp); //is the variable pattern a RegExp?
```


## 执行环境和作用域

执行环境定义了变量或函数有权访问的其他数据，每个执行环境都有与之关联的变量对象，在Web浏览器中，全局执行环境被认为是window对象。每个函数都有自己的执行环境。当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。

作用域链的**用途**，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域的前端，始终都是当前执行的代码所在环境的变量对象。例如当环境是函数时，活动对象最开始只包含了一个变量，即arguments对象（这个对象在全局环境中是不存在的。）全局执行环境的变量对象始终都是作用域链中的最后一个对象。


**变量查询：变量的值从函数作用域开始找，找到则直接获取值，否则将从作用域链向后查找，也就是从全局查找，如果还是没有找到，则会是undefined。**(在查找标识符的过程中，如果局部环境中存在着同名标识符，就不会使用位于父环境中的标识符)。变量的查询也是需要代价的，访问局部变量肯定要比访问全局变量快一些，因为不用向上搜索作用域链。当然JavaScript引擎对此做了优化，差别应当很小甚至忽略不计。

每次进入一个新的执行环境，都会创建一个用于搜索变量和函数的作用域链。 函数的局部环境(内部环境)可以通过作用域链访问所有的外部环境，但全局环境(外部环境)不能访问内部环境中的任何变量和函数。下面是例子：

**执行环境只有两种：全局执行环境、局部执行环境(函数)**

```js
var color = “blue”;
function changeColor(){
	var anotherColor = “red”;
	function swapColors(){
		var tempColor = anotherColor;
		anotherColor = color;
		color = tempColor;
		//color, anotherColor, and tempColor are all accessible here
	}
	//color and anotherColor are accessible here, but not tempColor
	swapColors();
}
//only color is accessible here
changeColor();
```


**延长作用域链**:可以通过trycatch语句的catch与with

```js
function buildUrl() {
	var qs = "?debug=true";
	with(location){
		var url = href + qs;
	}
	return url;
}
```

**没有块级作用域**：JavaScript没有块级作用域，但在JavaScript中，if语句中的变量声明会将变量添加到当前的执行环境，另外，由for语句创建的变量i即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中。


**var**:使用var声明的变量会**自动被添加到最接近的环境**中，在函数内部，最接近的环境就是函数的局部环境；在with语句中，最接近的环境是函数环境。如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境。变量声明提升到最接近的环境的首部。

## 垃圾回收机制

JavaScript具有自动垃圾收集机制，原理是在按照固定的时间间隔找出那些不再继续使用的变量，然后释放其占用的内存。

第一种垃圾收集方式是**标记清除**(mark-and-sweep)，当变量进入环境时，就将这个变量标记为“进入环境”，当变量离开环境时，则将其标记为“离开环境”。该种方式被多种浏览器支持。

另一种不太常见的垃圾收集策略是叫做**引用计数**。引用计数的含义是跟踪记录每个值被引用的次数。当这个值的引用次数变成0时，则说明没有办法在访问这个值了，因而就可以将其占用的内存空间回收回来。

引用计数存在循环引用问题：

```js
function problem(){
	var objectA = new Object();
	var objectB = new Object();
	objectA.someOtherObject = objectB;
	objectB.anotherObject = objectA;
}
```


分配给Web浏览器的可用内存数量通常要比分配给桌面应用程序的少，这样做的目的主要是出于安全方面的考虑，是为了防止运行JavaScript的网页好进全部系统内存而导致系统崩溃。一旦数据不再用，最好通过将其设置为null来释放其引用，此做法叫做**解除引用**，适用于大多数全局变量和全局对象的属性。**解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其收回**。