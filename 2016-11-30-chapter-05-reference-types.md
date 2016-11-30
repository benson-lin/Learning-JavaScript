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

### 转换方法：

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

**push()/shift()/unshift()**：数组的队列方法（先进先出）。队列在列表的末端添加项，从列表的前端移除项。仍然使用push( )向数组末端添加项，使用shift( )从数组前端取得第一项并返回该项，同时将数组长度减1。Unshift( )方法与shift( )的用途相反，它能在数组前端添加任意个项并返回新数组的长度。


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


**slice()**：数组的slice( )方法，基于当前数组中的一或多个项创建一个新数组。接收一个到两个参数，即返回项的起始和结束为止，但不返回结束位置的项。


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