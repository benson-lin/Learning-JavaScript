# 引用类型

## Object 类型

创建Object实例的方式有两种，第一种是使用**new操作符**后跟Object构造函数,第二种是使用**对象字面量**表示法。属性名可以是字符串，如果是数值属性会自动转为字符串。

```js
var person = new Object( );
person.name = “Nicholas”;
person.age=29;


var person = {
	name : “Nicholas”,
	age : 29
};



var person = {
	“name” : “Nicholas”,
	“age” : 29,
	5: true
};

```

两种访问对象属性的方法，一是**方括号语法**，例如person[“name”],而另一种是**点表示法**，例如person.name。

```js
alert(person[“name”]); //”Nicholas”
alert(person.name); //”Nicholas”
```

方括号语法的主要优点是可以通过变量来访问属性。如果属性名中包含会导致语法错误的字符（属性名中包含非字母非数字的），或者属性名使用的是关键字或保留字，也可以使用方括号表示法。通常，更建议用点表示法。

```js
var propertyName = “name”;
alert(person[propertyName]); //”Nicholas”

person[“first name”] = “Nicholas”;
```



## Array 类型

不同于其他语言，ECMAScript数组的每一项可以保存任何类型的数据，而且ECMAScript数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。

创建数组的基本方式有两种：一是**使用Array构造函数**，如 var colors = new Array( );第二种方式是**使用数组字面量表示法**。如var colors = [“red”, “blue”, “green”];不要以逗号结尾，以免产生混淆。如 var values = [1,2,] ，会创建一个包含2或3项的数组

```js
var colors = new Array();
var colors = new Array(20);
var colors = new Array(“red”, “blue”, “green”);
```


数组的length属性不是只读的，可以自定义。如果设置的值比原数组长度小，则后面的都将设为undefined；如果大于原数组长度，则后面的设为undefined；因此可以很方便的从数组的末尾移除项或向数组中添加新项，只需使用length就可以了。

```js
var colors = [“red”, “blue”, “green”]; //creates an array with three strings
var names = []; //creates an empty array
alert(colors.length); //3
alert(names.length); //0


var colors = [“red”, “blue”, “green”]; //creates an array with three strings
colors.length = 2;
alert(colors[2]); //undefined

var colors = [“red”, “blue”, “green”]; //creates an array with three strings
colors.length = 4;
alert(colors[3]); //undefined


var colors = [“red”, “blue”, “green”]; //creates an array with three strings
colors[colors.length] = “black”; //add a color (position 3)
colors[colors.length] = “brown”; //add another color (position 4)
```


对于一个网页，或者一个全局作用域而言，使用instanceof操作符就能得到满意的结果。但instanceof操作符的问题在于，它假定只有一个全局执行环境。因此，ECMAScript5新增了Array.isArray( )方法。此方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。支持Array.isArray( )方法的浏览器有IE9+、Firefox4+、Safari5+、Opera10.5+和Chrome。

```js
if (value instanceof Array){
//do something on the array
}

if (Array.isArray(value)){
//do something on the array
}
```

### Array 函数

所有数组对象都具有toLocaleString( )、toString( )和valueOf( )方法。其中调用数组的toString( )方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。而valueO( )返回的还是数组。注意：alert()接收字符串参数，所以它会在后台调用toString( )方法

```js
var colors = [“red”, “blue”, “green”]; //creates an array with three strings
alert(colors.toString()); //red,blue,green
alert(colors.valueOf()); //red,blue,green
alert(colors); //red,blue,green
```

**join()方法**：可以使用不同的分隔符来构建这个字符串。Join( )方法只接收一个参数，即用作分隔符的字符串，然后返回包含所有数组项的字符串。


```js
var colors = [“yellow”,”red”,”green”];
alert(colors.join(“|”));   //yellow|red|green
```

如果不给join()方法传入任何值，或者给它传入undefined，则使用逗号作为分隔符。IE7及更早版本会错误的使用字符串“undefined”作为分隔符。

**push()/pop()**：数组的栈方法（后进先出）的数据结构。push( )方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。而pop( )方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

**push()/shift()/unshift()**：数组的队列方法（先进先出）。push()队列在列表的末端添加项，shift()从列表的前端移除项。仍然使用push()向数组末端添加项，使用shift()从数组前端取得第一项并返回该项，同时将数组长度减1。Unshift( )方法与shift( )的用途相反，它能在数组前端添加任意个项并返回新数组的长度。


**reverse()/sort()**：数组的两个重排序方法：reverse( )方法会翻转数组想的顺序，sort( )按升序排列数组项，sort( )方法会调用每个数组项的toString( )转型方法，然后比较得到的字符串，以确定如何排序。因此，sort( )方法可以接收一个比较函数作为参数，以便指定哪个值位于哪个值的前面。

```js
function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}
var values = [0, 1, 5, 10, 15];
values.sort(compare);
alert(values); //0,1,5,10,15
values.sort();
alert(values); //0,1,10,15,5
```

**concat()**：数组的concat()方法可以基于当前数组中的所有创建的一个新数组，创建当前数组的一个副本，然后将接收到到的参数添加到这个副本的末尾。

```js
var list1 = [0,5,15,10];
var list2 = [200,300,400];
var list3 = list1.concat(list2);

console.log(list3);//[0, 5, 15, 10, 200, 300, 400]
```

**slice()**：数组的slice( )方法，基于当前数组中的一或多个项创建一个新数组。接收一个到两个参数，即返回项的起始和结束为止，但不返回结束位置的项。

```js
var list3 = [0, 5, 15, 10, 200, 300, 400];
console.log(list3.slice(1,3));
//[5, 15]
```

**splice()**：数组的splice()方法是最强大的数组方法，主要用途是向数组的中部插入项。
- 删除：可以或删除任意数量的项，只需指定2个参数：要删除的第一项的位置，和要删除的项数；
- 插入：可以向指定位置插入任意数量的项，需指定3个参数：起始位置、0（要删除的项数）、要插入的项数。
- 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，需指定3个参数：起始位置，要删除的项数、要插入的任意数量的项。

- Splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则范湖一个空数组）。

```js
var colors = ["red","green","blue"];
var removed = colors.splice(0,2);
colors     //["blue"]
removed   //["red","green"]
 
removed =colors.splice(0,0,"yellow","orange");   //[]
colors                                   //["yellow", "orange", "blue"]
 
removed = colors.splice(1,3,"red","pink");   //["orange", "blue","yellow"]
colors                               //["yellow", "red", "pink","orange"]
 
var colors = ["yellow", "orange","blue"];
removed = colors.splice(1,2,"red","pink");   //["orange", "blue"]
colors                                //["yellow","red", "pink"]
```


**indexOf()/lastIndexOf()**：数组位置查找方法：indexOf()和lastIndexOf()。这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。成功则返回查找的项在数组中的第一次出现的位置，否则返回-1.在比较过程中，将使用全等操作符。

```js
var numbers = [1,2,3,4,5,4,3,2,1];
numbers.indexOf(4);  //3
numbers.indexOf("4"); //-1
numbers.lastIndexOf("4"); //-1
numbers.lastIndexOf(4);   //5
numbers.indexOf(4,4);    //从起始位置向后找
numbers.lastIndexOf(4,4)  //3 从起始位置向前找
numbers.lastIndexOf(4,5)  //5从起始位置向前找
 
var person ={name:"Nicholas"};
var people=[{name:"Nicholas"}];
var morePeople = [person];
people.indexOf(person);   //-1
morePeople.indexOf(person); //0
```


ECMAScript 5为数组定义了5个迭代方法。每个方法要接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。

- **every()**：对数组中的每一项运行给定函数，如果该函数对每一项都返回true，则返回true；
- **filter( )**: 对数组中的每一项运行给定函数，返回该函数会返回true的项组成的数组；
- **forEach()**：对数组中的每一项运行给定函数，无返回值；
- **map()**：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组；
- **some()**：对数组中的每一项运行给定函数，如果该函数对任一项返回true，则返回true。
以上方法都不会修改数组中的包含的值。



数组归并方法：**reduce()**和**reduceRight()**。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。reduce( )方法从数组的第一项开始，逐个遍历到最后，而reduceRight( )则从数组的最后一项开始，向前遍历到第一项。

```js
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array){
	return (item > 2);
});
alert(everyResult); //false


var someResult = numbers.some(function(item, index, array){
	return (item > 2);
});
alert(someResult); //true


var numbers = [1,2,3,4,5,4,3,2,1];
var filterResult = numbers.filter(function(item, index, array){
		return (item > 2);
});
alert(filterResult); //[3,4,5,4,3]


var numbers = [1,2,3,4,5,4,3,2,1];
numbers.forEach(function(item, index, array){
	//do something here
});


var numbers = [1,2,3,4,5,4,3,2,1];
var mapResult = numbers.map(function(item, index, array){
	return item * 2;
});
alert(mapResult); //[2,4,6,8,10,8,6,4,2]

var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array){
	return prev + cur;
});
alert(sum); //15
```


## Date 类型

Date构造函数接受毫秒数，这里的毫秒数一定是UTC的1970.1.1开始到现在的时间，一定是UTC(Coordinated Universal Time,协调世界时)。

GMT 格林尼治标准时间,世界时所在的地区，因此也等同于世界时

如果输入的是字符串而所在地区又不是UTC，会先转为本初子午线上的时间对应的毫秒数，最后变成当前时区的日期，所以说最后字符串上的时间是多少就是多少。

其实输入字符串的时候，其实是先调用了Date.parse('2016-11-30')转为了毫秒数。

Date.UTC()返回的也是当前毫秒数，可以使用参数来获取具体时间。其中月份是0-11，小时是0-23。。

Date如果直接输入年月日多个参数，那么输入的时间是多少，在当前时区就显示多少；但是参数是和UTC函数是一直，也就是说月份是0-11，小时是0-23。

```js
var date = new Date();//Thu Dec 01 2016 09:14:04 GMT+0800 (中国标准时间)
console.log(date);

var date2 = new Date('2016-11-30 11:00:11');
console.log(date2);//Wed Nov 30 2016 11:00:11 GMT+0800 (中国标准时间)
//字符串是多少就是多少

var date3 = new Date('n');
console.log(date3);//Invalid Date

var date4 = new Date(Date.UTC(2016,0)); // Fri Jan 01 2016 08:00:00 GMT+0800 (中国标准时间)
//2016年1月1日八时
console.log(date4);

var date5 = new Date(2016,11,1,8,21);// 月0-11 时0-23  2016-11-2 8:21:00 
//Thu Dec 01 2016 08:21:00 GMT+0800 (中国标准时间)
//2016年12月1日8时21分
console.log(date5);
```


ECMAScript 5添加了Date.now()方法，返回调研那个这个方法时的日期和时间的毫秒数

```js
var now = Date.now();
console.log(now);
var date = new Date(now);
console.log(date);

//1480556109342
//Thu Dec 01 2016 09:35:09 GMT+0800 (中国标准时间)
```

可以使用+将Date对象转换为时间戳

```js
var date2 = +new Date();
console.log(date2);
//1480556182499
```

### Date 函数

```js
var date = new Date('2016-11-30 11:20:11');

//get相关
console.log(date.getDate());//当前月有多少天 //30
console.log(date.getMonth());// 月份0-11   //10
console.log(date.getTime());// 毫秒数 //1480474811000
console.log(date.getFullYear());//获得4位数年份  //2016  
console.log(date.getDay());//周几 0是周日，7是周六  //3
console.log(date.getMinutes());///获取分钟
console.log(date.getSeconds());///获取秒

console.log(date.getUTCHours());//对应的UTC的小时数 //11-8=3
//上面的其他方法都有类似的getUTCxx方法，如getUTCMonth()

//set相关，上面能get的也能set
date.setFullYear(2017);
console.log(date);//Thu Nov 30 2017 11:20:11 GMT+0800 (中国标准时间)
date.setUTCHours(8);
console.log(date);//Thu Nov 30 2017 16:20:11 GMT+0800 (中国标准时间)
```

## Function

在js中，函数也是对象。

使用**函数表达式**定义函数时，function关键字后面没有函数名，且函数末尾必须有分号。函数名仅仅是指向函数的指针，因此一个函数可能会有多个名字。

```js
function sum (num1, num2) {
	return num1 + num2;
}

var sum = function(num1, num2){
	return num1 + num2;
};
```


还有一种是使用构造函数的方式, 虽然不推荐(需要解析两次，一次是解析常规ECMAScript代码，一次是解析传入构造函数的字符串)，但是有利于理解函数是对象，函数名是指针的概念。

```js
var sum = new Function(“num1”, “num2”, “return num1 + num2”); //not recommended
```

函数名的复制也是只复制引用。注意，使用不带圆括号的函数名是访问函数指针，而非调用函数。

```js
function sum(num1, num2){
	return num1 + num2;
}
alert(sum(10,10)); //20
var anotherSum = sum;//指针
alert(anotherSum(10,10)); //20
sum = null;
alert(anotherSum(10,10)); //20
```

以函数表达式的形式，而不是**函数声明**的形式再次说明没有重载，如果函数相同，总以最后一个为准。

```js
function addSomeNumber(num){
	return num + 100;
}
function addSomeNumber(num) {
	return num + 200;
}
var result = addSomeNumber(100); //300
```

其实和下面的函数表达式方式等价：

```js
var addSomeNumber = function (num){
	return num + 100;
};
addSomeNumber = function (num) {
	return num + 200;
};
var result = addSomeNumber(100); //300
```


函数声明 和 函数表达式 是有区别的。解析器会先解析函数声明，并使其在执行任何代码之前可用（可以访问），也就是有一个**函数声明提升**的过程；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行。因此对于函数表达式而言，不能将函数放到调用的后面。

```js
//下面是正确的
function test(){ 
    foo(); 
    function foo(){ 
        alert("foo"); 
    } 
} 
test(); 

//下面是错误的
function test(){ 
    foo(); 
    var foo = function foo(){ 
        alert("foo"); 
    } 
} 
test(); 
```

### 函数作为参数和返回值

可以**函数作为另一个函数的形参**，也就是函数式编程。


```js
function callSomeFunction(someFunction, someArgument){
	return someFunction(someArgument);
}

function add10(num){
	return num + 10;
}
var result1 = callSomeFunction(add10, 10);
alert(result1); //20
function getGreeting(name){
	return “Hello, “ + name;
}
var result2 = callSomeFunction(getGreeting, “Nicholas”);
alert(result2); //”Hello, Nicholas”
```

也可以将一个**函数作为返回值**返回。

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

var data = [{name: “Zachary”, age: 28}, {name: “Nicholas”, age: 29}];
data.sort(createComparisonFunction(“name”));
alert(data[0].name); //Nicholas
data.sort(createComparisonFunction(“age”));
alert(data[0].name); //Zachary
```

### arguments/this/caller

函数内部有两个特殊的对象：**arguments和this**。arguments的主要用途是保存函数参数，但它还有个名为callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。

arguements.callee在使用递归的时候可以很好的**解决耦合问题**，这样在使用函数表达式的时候，就不用依赖函数名了，可以随意复制函数名而不出错。**简单来说就是，返回函数本身，只是换了一个名**

```js
function factorial(num){
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num-1)
		//等价
		//return num * factorial(num-1)
	}
}
var trueFactorial = factorial;
alert(trueFactorial(5)); //120
```

this对象引用的是**函数据以执行的环境对象**(太抽象了)。简单来说，就是**this的值是哪个对象调用了这个函数，那么这个对象就是this的值**；如果没有看到显式的调用，那么this就是window；

```js
window.color = “red”;
var o = { color: “blue” };
function sayColor(){
	alert(this.color);
}
sayColor(); //”red”
o.sayColor = sayColor;
o.sayColor(); //”blue”
```

ECMASCript5中定义了另一个函数对象的属性：**caller**。这个属性中保存着调用当前函数的函数的引用。严格模式下，访问arguments.caller属性会导致错误，另外不能为函数的caller属性赋值，否则会导致错误。**简单的说，就是返回调用这个A函数的B函数，或者说B调用了A函数，A里面使用A.caller就得到了B的引用**。

```js
function outer(){
	inner();
}
function inner(){
	alert(inner.caller);//指向outer()
}
outer();
```

可以看到inner()函数里使用了inner函数名本身，如何解耦呢，就是使用前面的callee。

```js
function outer(){
	inner();
}
function inner(){
	alert(arguments.callee.caller);
}
outer();
```

### 函数的属性(length/prototype)和方法(call/apply/bind)


每个函数都包含两个属性：**length和prototype**，其中，length属性表示函数希望接收的**命名参数的个数**。对于ECMAScript中的引用各类型而言，protorype是保存它们所有实例方法的真正所在，**只不过我们是通过各自对象的实例去访问罢了**。在ECMAScript5中，prototype属性是不可枚举的，因此使用for-in无法发现。

```js
function sayName(name){
	alert(name);
}
function sum(num1, num2){
	return num1 + num2;
}

alert(sayName.length); //1
alert(sum.length); //2

```

每个函数都包含两个非继承而来的方法：**apply()和call()**。这两个方法的用途都是在特定的作用域中调用函数，实际上等于**设置函数体内this对象的值**。给我们另一种方式去调用函数，但是更加灵活(this)。

apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中第二个参数可以是Array的实例，也可以是arguments对象。

```js
function sum(num1, num2){
	return num1 + num2;
}
function callSum1(num1, num2){
	return sum.apply(this, arguments); //passing in arguments object
}
function callSum2(num1, num2){
	return sum.apply(this, [num1, num2]); //passing in array
}
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20
```


call()方法与apply()方法的作用相同，它们的区别**仅在于接收参数的方式不同**。对于call( )方法而言，第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。换句话说，在使用call( )时，传递给函数的参数必须逐个列举出来。

```js
function sum(num1, num2){
	return num1 + num2;
}
function callSum(num1, num2){
	return sum.call(this, num1, num2);
	// return sum(num1, num2);
}
alert(callSum(10,10)); //20
```

如果没有参数，两个方法是一样的

```js
function foo(){
	return 'foo';
}
function foo1(){
	return foo.apply(this);
}
function foo2(){
	return foo.call(this);
}
```


apply()和call()最强大的地方在于能够**扩充函数赖以运行的作用域，可以随时变换内部的this对象**。好处是对象不需要与方法有任何耦合关系。

```js
window.color = “red”;
var o = { color: “blue” };
function sayColor(){
	alert(this.color);
}

sayColor(); //red
sayColor.call(this); //red
sayColor.call(window); //red 
sayColor.call(o); //blue //通过call将this的值从window变成了o
```

ECMAScript 5 还定义了一个方法：**bind()**。这个方法会创建一个函数的实例，其this值会被绑定到传给bind()函数的值。


```js
window.color = “red”;
var o = { color: “blue” };
function sayColor(){
	alert(this.color);
}
var objectSayColor = sayColor.bind(o);
objectSayColor(); //blue
```

