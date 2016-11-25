# 基本概念


ECMAScript 5引入了严格模式的概念，严格模式是为JavaScript定义了一种不同的解析与执行模型。  严格模式下，JavaScript的执行结果会有很大不同。 在严格模式下，ECMAScript3中的一些不确定的行为将得到处理，而且对某些不安全的操作会抛出错误。在整个脚本中启动严格模式，可在定都添加”use strict”;也可指定函数在严格模式下执行。	


ECMAScript中的语句以一个分号结尾，如果省略分号，则由解析器确定语句的结尾。加上分号会在某些情况下增进代码的性能，因为这样解析器就不必再花时间推测应该在哪里插入分号了。

ECMAScript的变量是**松散类型**的，可以用来保存任何类型的数据。用var操作符定义的变量将成为定义该变量的作用域中的局部变量，未经初始化的变量会保存一个特殊的值——undefined。在严格模式下，不能定义名为eval或arguments的变量，否则会导致语法错误。



## 基本数据类型



ECMAScript有**5种基本数据类型**：Undefined、Null、Boolean、Number、String，一种复杂类型：Object。

### typeof操作符

用来检测给定变量的数据类型，对一个值使用typeof操作符可能返回下列某个字符串：

- “undefined”——如果这个值为定义；
- “boolean”——如果这个值是布尔值；
- “string”——如果这个值是字符串；
- “number”——如果这个值是数值；
- “object”——如果这个值是对象**或者null**；null是空指针对象
- “function”——如果这个值是函数。

### Undefined

Undefined类型只有一个值，即特殊的undefined。

undefind 和未声明是不同的：

```js
var message; //this variable is declared but has a value of undefined
//make sure this variable isn’t declared
//var age
alert(message); //”undefined”
alert(age); //causes an error
```

但是对未初始化的变量执行typeof操作符会返回undefined值，而对未声明的变量执行typeof操作符同样也会返回undefined值。

```js
var message; //this variable is declared but has a value of undefined
//make sure this variable isn’t declared
//var age
alert(typeof message); //”undefined”
alert(typeof age); //”undefined”
Undefi
```

### Null

Null类型也只有一个值，即特殊的null。从逻辑角度来看，null表示一个**空对象指针**，因此，typeof操作符检测null会返回”object“。** null == undefined会返回true**，这是因为==操作符处于比较的目的会转换其操作数。

```js
null == undefined
true

typeof(null)
"object"
```

### Boolean

Boolean类型仅两个字面值：true和false，其他混合大小写形式都不是Boolean值；
这两个值和数字值不是一回事，也就是说true不一定等于1，false不一定等于0；


各种数据类型转Boolean类型的转换规则：

```text
数据类型            转换为true的值           转换为false的值
Boolean               true                    False
String             任何非空字符串             ""（空字符串）
Number          任何非零数字值（包括无穷大）     0和NaN
Object               任何对象                  null
Undefined            n/a(不适用)              undefined
```


这些转换在理解**if等语句自动执行Boolean的转换**非常重要：

```js
var message = “Hello world!”;
if (message){
	alert(“Value is true”);
}
```



### Number


数值字面量，如果八进制无效，将去除前面的0，也就是变成八进制。在进行算术运算时，所有八进制和十六进制都会转换为十进制。

```js
var intNum = 55;
var octalNum1 = 070; //octal for 56
var octalNum2 = 079; //invalid octal - interpreted as 79
var octalNum3 = 08; //invalid octal - interpreted as 8
```


#### 数值范围

保存浮点数值需要的内存空间是保存整数值的**两倍**，因此ECMAScript会**尽可能**地将浮点数转换为整数值。


ECMAScript的最小数值为 `Number.MIN_VALUE=5e-324`,最大数值为 `Number.MAX_VALUE=1.797693134623157e+308`。如果超出JavaScript的数值范围，将会自动转为Infinity, 或者-Infinity,这两个值不能参与计算。可以用 `isFinite( )` 函数判断一个数值是不是有穷的。可以通过 `Number.NEGATIVE_INFINITY` 和 `Number.POSITIVE_INFINITY` 获取这iangge值。

```js
n = Number.NEGATIVE_INFINITY;
-Infinity
n = Number.POSITIVE_INFINITY;
Infinity
```

#### NaN

NaN，即非数值( Not aNumber)，是一个特殊的数值，用于表示一个本来要返回数值的操作数为返回数值的情况。任何数值除以0都会返回NaN，且在ECMAScript中不会影响其他代码的执行。NaN两大特点：**任何涉及NaN的操作，都会返回NaN；NaN与任何数值都不相等，包括NaN本身**。IsNaN( )函数用来判断接收的参数是否“不是数值”。

```js
alert(NaN == NaN); //false
alert(isNaN(NaN)); //true
alert(isNaN(10)); //false - 10 is a number
alert(isNaN(“10”)); //false - can be converted to number 10
alert(isNaN(“blue”)); //true - cannot be converted to a number
alert(isNaN(true)); //false - can be converted to number 1
```


有3个函数可以把非数值转换为数值：Number()、parseInt()和parseFloat()Number()函数可以用于任何数据类型转换。后两个为字符串转数值。

Number()函数其转换规则如下：

- 如果是Boolean值，true和false将分别被转换为1和0；
- 如果是数字值，知识简单的传入和返回；
- 如果是null值，返回0；
- 如果是undefined，返回NaN。
- 如果是字符串，规则如下：
 - 如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值（前导的零被忽略）'011'->11，而不是八进制；
 - 如果字符串中包含有效的浮点格式，如“1.1”，则将其转换为对应的浮点数值（前导的零被忽略）；
 - 如果字符串中包含有效的十六进制格式，例如“0xf”，则将其转换为相同大小的十进制整数值；
 - 如果字符串是空的（不包含任何字符），则将其转换为0；
 - 如果字符串中包含除上述格式之外的字符，则将其转换为NaN。
- 如果是对象，则调用对象的valueOf( )方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString( )方法，然后再次依照前面的规则转换返回的字符串值。


```js
var num1 = Number(“Hello world!”); //NaN
var num2 = Number(“”); //0
var num3 = Number(“000011”); //11
var num4 = Number(true); //1
```


parseInt()更常用，它会忽略前面的空格和非法字符，直到找到第一个有效字符。如果没有找到有效的字符(数字字符或符号)，返回NaN，比如parseInt("")将返回NaN; 继续解析知道遇到一个非数字字符或字符结束，后面的非数字字符会被忽略。  

```js
var num1 = parseInt(“1234blue”); //1234
var num2 = parseInt(“”); //NaN
var num3 = parseInt(“0xA”); //10 - hexadecimal
var num4 = parseInt(22.5); //22
var num5 = parseInt(“70”); //70 - decimal
var num6 = parseInt(“0xf”); //15 - hexadecimal
```

转换时最好指明基数，而不是用0或0x去表示，防止ECMAScript3和5的区别。 第二个参数表示要转换的那个数要用多少进制转换成十进制，例如var num1 = parseInt(“10”,2); //输出结果是2。如果第二个参数指定了16，第一个参数可以不加0x。


```js
var num1 = parseInt(”AF”, 16); //175
var num2 = parseInt(”AF”); //NaN

var num1 = parseInt(“10”, 2); //2 - parsed as binary
var num2 = parseInt(“10”, 8); //8 - parsed as octal
var num3 = parseInt(“10”, 10); //10 - parsed as decimal
var num4 = parseInt(“10”, 16); //16 - parsed as hexadecimal
```



parseFloat( )与parseInt( )的两个区别：字符串中的第一个小数点对parseFloat()是有效的，对parseInt()是无效的；parseFloat()始终会忽略前导的零，即其只能解析十进制值，没有用第二个参数指定基数的用法。如果可以转为整数，那么就会返回整数，而不是浮点数：parseFloat(“1234.00”)=1234！


```js
var num1 = parseFloat(“1234blue”); //1234 - integer
var num2 = parseFloat(“0xA”); //0
var num3 = parseFloat(“22.5”); //22.5
var num4 = parseFloat(“22.34.5”); //22.34
var num5 = parseFloat(“0908.5”); //908.5
var num6 = parseFloat(“3.125e7”); //31250000
```


### String

String类型用于表示由零或多个16为Unicode字符组成的字符序列，由单引号（’）或双引号（”）表示。


字符字面量 \t \n

把一个值转换为一个字符串有两种方式：toString( )方式，数值、布尔值、对象和字符串值均可，但null和undefined无此方法。toString( )方法可设置转换基数。

在不确定要转换的值是不是null或undefined的情况下，还可以使用转型函数String( )，此方式能将任意类型的值转换为字符串，其遵守以下转换规则：
如果值有toString()方法，则调用该方法（没有参数）并返回相应的结果；
如果值是null，则返回”null”；
如果值是undefined，则返回”undefined”。


### Object

在ECMAScript中，Object类型是所有它的实例的基础，即Object类型所具有的任何属性和方法也同样存在于更具体的对象中。存在以下属性和方法：

- constructor：保存着用于创建当前对象的函数。
- hasOwnProperty(propertyName)：用于检查给定的属性在当前对象实例中是否存在，其中，属性名必须以字符串的形式指定，例如o.hasOwnProperty(“name”)。
- isPrototypeOf(object)：用于检查对象是否是传入对象的原型。
- propertyIsEnumerable(propertyName)：用于检查给定的属性是否能够使用for-in语句来枚举。
- toLoacleString( )：返回对象的字符串表示，该字符串与执行环境的地区对应。
- toString( )：返回对象的字符串表示。
- valueOf( )：返回对象的字符串、数值或布尔值表示。通常与toString( )方法的返回值相同。






