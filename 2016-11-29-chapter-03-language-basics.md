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

Null类型也只有一个值，即特殊的null。从逻辑角度来看，null表示一个**空对象指针**，因此，typeof操作符检测null会返回"object"。**null == undefined会返回true**，这是因为==操作符处于比较的目的会转换其操作数。

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


ECMAScript的最小数值为 `Number.MIN_VALUE=5e-324`,最大数值为 `Number.MAX_VALUE=1.797693134623157e+308`。如果超出JavaScript的数值范围，将会自动转为Infinity, 或者-Infinity,这两个值不能参与计算。可以用 `isFinite( )` 函数判断一个数值是不是有穷的。可以通过 `Number.NEGATIVE_INFINITY` 和 `Number.POSITIVE_INFINITY` 获取这两个值。

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
- 如果是数字值，只是简单的传入和返回；
- 如果是null值，返回0；
- **如果是undefined，返回NaN。**
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


parseInt()更常用，核心是遇到字母就停止解析，并就已经解析的部分进行转换为不同的值，有些是无效的，有些是有效的。


- 如果是第一位不是0就遇到字母就停止解析，并把字母前面的值作为10进制去解析，如果第一个就是字母那么值就是空，空成了NaN,比如:
parseInt("a")==>parseInt("",10)==>NaN.
parseInt("10a")==>parseInt("10")==>parseInt("10",10)==>10;
- 如果第一位是0,且第2位不是x也和上面一样遇到字母就停止解析，并把字母前面的值作为8进制去解析,比如:
parseInt("0a")==>parseInt("0")==>parseInt("0",10)==>0.
PS:这个有点特殊，因为0a被解析成了0，还不具备看做是8进制的结构，下面那个就明显了。
parseInt("010a")==>parseInt("010")==>parseInt("10",8)==>8;
- 如果第一位是0,且第2位是x那后面也和上面一样遇到字母就停止解析，并把字母前面的值作为16进制去解析,比如:
parseInt("0xt")==>parseInt("",16)==>NaN.
parseInt("0x12t")==>parseInt("12",16)==>18.

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


## 操作运算符

只能操作一个值的操作符叫做**一元操作符**，包括递增（++）和递减（--）操作符，均可前置和后置。

这些操作符在应用与非整数类型时，遵守以下规则：

- 在应用于一个包含有效数字字符的字符串时，先将其转换为数字值，再执行加减1的操作。字符串变量变成数值变量。
- 在应用于一个不包含有效数字字符的字符串时，将变量的值设为NaN，字符串变量变为数值变量。
- 在应用于布尔值false时，先将其转换为0再执行加减1的操作，布尔值变量变为数值变量。
- 在应用于布尔值true时，先将其转换为1再执行加减1的操作，布尔值变量变成数值变量。
- 在应用于浮点数值时，执行加减1的操作。
- 在应用于对象时，先调用对象的valueOf( )方法，以取得一个可供操作的值，然后对该值应用前述规则，如果结果是NaN，则再调用toString( )方法后应用前述规则。对象变量变成数值变量


一元加操作符以一个加号(+)表示，放在数值前面，不会对数值产生任何影响，但**对非数值应用一元加操作符**时，该操作符会像Number( )转型函数一样对这个值进行转换。

**一元减操作符**以一个减号(-)表示，放在数值前面，该值变成负数，当应用于非数值时，一元减操作符遵循与一元加操作符相同的规则，最后再将得到的数值转换为负数。


**逻辑非操作符**由一个叹号（！）表示，可用于ECMAScript中的任何值。逻辑非操作符遵循下列规则：

- 如果操作数是一个对象，返回false；
- 如果操作数是一个空字符串，返回true；
- 如果操作数是一个非空字符串，返回false；
- 如果操作数是数值0，返回true；
- 如果操作数是任意非0数值（包括Infinity），返回false；
- 如果操作数是null，返回true；
- 如果操作数是NaN，返回true；
- 如果操作数是undefined，返回true。


```js
alert(!false); //true
alert(!”blue”); //false
alert(!0); //true
alert(!NaN); //true
alert(!””); //true
alert(!12345); //false
```

**逻辑与操作符**由两个和号（&&）表示，可以应用于任何类型的操作数，而不仅仅是布尔值。在有一个操作数不是布尔值的情况下，逻辑与操作就不一定返回布尔值，此时，它遵循以下规则：

- 如果第一个操作数是对象，则返回第二个操作数；
- 如果第二个操作数是对象，则只有在第一个操作数的求值结果为true的情况下才会返回该对象；
- 如果两个操作数都是对象，则返回第二个操作数；
- 如果有一个操作数是null，则返回null；
- 如果有一个操作数是NaN，则返回NaN；
- 如果有一个操作数是undefined，则返回undefined。

逻辑与是**短路操作**，即如果第一个操作数能够决定结果，则不会对第二个操作数求值。


**逻辑或操作符**由两个竖线符号(||)表示，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值，此时，其遵循以下规则：

- 如果第一个操作数是对象，则返回第一个操作数；
- 如果第一个操作数的求值结果是false，则返回第二个操作数；
- 如果两个操作数都是对象，则返回第一个操作数；
- 如果两个操作数都是null，则返回null；
- 如果两个操作数都是NaN，则返回NaN；
- 如果两个操作数都是undefined，则返回undefined。

逻辑或也是短路操作。可利用逻辑或的这一行为来避免为变量赋null或undefined值。


**乘法操作符**由一个星号(*)表示，用于计算两个数值的乘积。在处理特殊值的情况下，乘法操作符遵循以下规则：

- 如果操作数都是数值，执行常规的乘法计算。如果乘积超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Inifinity与0相乘，则结果是NaN；
- 如果是Inifinity与非0数值相乘，则结果是Infinity或-Infinity，取决于有符号操作数的符号；


**除法操作符**由一个斜线符号(/)表示，执行第二个操作数除第一个操作数的计算，其对特殊值处理的规则如下：

- 如果操作数都是数值，执行常规的除法计算，如果商超过了ECMAScript数值的表示范围，则返回Infinity或-Infinity；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity被Infinity除，则结果是NaN；
- 如果是零被零除，则结果是NaN；
- 如果是非零的有限数被零除，则结果是Infinity或-Infinity，取决于有符号操作数的符号；
- 如果是Infinity被任何非零数值除，则结果是Infinity或-Infinity，取决于有符号操作数的符号。
- 如果有一个操作数不是数值，则在后台调用Number( )将其转换为数值，然后再应用之前的规则。


**求模（余数）操作符**由一个百分号(%)表示，对特殊值的处理规则如下：

- 如果操作数都是数值，执行常规的除法计算，返回除得的余数；
- 如果被除数是无穷大值而除数是有限大的数值，则结果返回NaN；
- 如果被除数是有限大的数值而除数是零，则结果是NaN;
- 如果是Infinity被Infinity除，则结果是NaN；
- 如果被除数是有限大的数值而除数是无穷大的数值，则结果是被除数；
- 如果被除数是零，则结果是零；
- 如果有一个操作数不是数值，则在后台调用Number( )将其转换为数值，再应用以上规则。

**加法操作符(+)**，如果两个操作数都是数值，执行常规的加法计算，然后根据以下规则返回结果：

- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity加Infinity，则结果是Infinity；
- 如果是-Infinity 加-Infinity，则结果是-Infinity；
- 如果是Infinity加-Infinity，则结果是NaN；
- 如果是+0加+0，则结果是+0；
- 如果是-0加-0，则结果是-0；
- 如果是+0加-0，则结果是+0；
- 如果有一个操作数是字符串，则应用以下规则：
- 如果两个操作数都是字符串，则将第二个操作数与第一个操作数拼接起来；
- 如果只有一个操作数是字符串，则将另一个操作数转换为字符串，然后再将两个字符串拼接起来。
- 如果有一个操作数是对象、数值或布尔值，则调用它们的toString( )方法取得相应的字符串值，然后再运用前面的关于字符串的规则。

对于undefined和null，则分别调用String( )函数并取得字符串”undefined”和”null”。

```js
var result1 = 5 + 5; //two numbers
alert(result1); //10
var result2 = 5 + “5”; //a number and a string
alert(result2); //”55”
```


**减法操作符**(-)在处理各种该数据类型转换时，遵守的特殊规则如下：

- 如果两个操作符都是数值，则执行常规的算术减法操作并返回结果；
- 如果有一个操作数是NaN，则结果是NaN；
- 如果是Infinity减Infinity，则结果是NaN；
- 如果是-Infinity减-Infinity，则结果是NaN；
- 如果是Infinity减-Infinity，则结果是Infinity；
- 如果是-Infinity减Infinity，则结果是-Infinity；
- 如果是+0减+0，则结果是+0；
- 如果是+0减-0，则结果是-0；
- 如果是-0减-0，则结果是+0；
- 如果有一个操作数是字符串、布尔值、null或undefined，则先在后台调用Number()函数将其转换为数值，然后再根据前面的规则执行减法计算。如果转换的结果是NaN，则减法的结果就是NaN；
- 如果有一个操作数是对象，则调用对象的valueOf()方法以取得表示该对象的数值。如果得到的值是NaN，则减法的结果就是NaN。如果对象没有valueOf( )方法，则调用其toString( )方法并将得到的字符串转换为数值。

```js
var result1 = 5 - true; //4 because true is converted to 1
var result2 = NaN - 1; //NaN
var result3 = 5 - 3; //2
var result4 = 5 - “”; //5 because “” is converted to 0
var result5 = 5 - “2”; //3 because “2” is converted to 2
var result6 = 5 - null; //5 because null is converted to 0
```


**关系比较符**有小于(<)、大于(>)、小于等于(<=)和大于等于(>=)。规则如下：

- 如果两个操作数都是数值，则执行数值比较。
- 如果两个操作数都是字符串，则比较两个字符串对应的字符编码值；
- 如果一个操作数是数值，则将另一个操作数转换为数值，然后执行数值比较；
- 如果一个操作数是对象，则调用这个对象的valueOf( )方法，用得到的结果按照前面的规则比较，若无valueOf( )方法，则用toString( )方法，同上。
- 如果一个操作数是布尔值，则先将其转换为数值，然后再执行比较。
注意：任何操作数与NaN进行关系比较，结果都是false。

```js
var result = “Brick” < “alphabet”; //true
var result = “Brick”.toLowerCase() < “alphabet”.toLowerCase(); //false
var result = “23” < “3”; //true
var result = “23” < 3; //false
var result = “a” < 3; //false because “a” becomes NaN
var result1 = NaN < 3; //false
var result2 = NaN >= 3; //false
```

**相等(==)和(!=)**，会先转换操作数，然后再比较它们的相等性。
转换不同的数据类型是，规则如下：

- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，true转换为1；
- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值；
- 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf( )方法，用得到的基本类型值按照前面的规则进行比较。
两个操作符在进行比较时则要遵循下列规则：
null和undefined是相等的。
要比较相等性之前，不能将null和undefined转换为其他任何值。
- 如果有一个操作数是NaN，则相等操作符返回false，而不相等操作符返回true。即使两个操作数都是NaN，相等操作符也返回false。
- 如果两个操作数都是对象，则比较它们是不是同一个对象，如果都指向同一个对象，则相等操作符返回true，否则，返回false。

**全等(===)和不全等(!==)**，仅在比较之前不转换操作数，其他方面与相等和不相等操作符没区别。注意：null==undefined会返回true，但null===undefined会返回false。因为他们是不同类型的值。

```js
var result1 = (“55” == 55); //true - equal because of conversion
var result2 = (“55” === 55); //false - not equal because different data types
```


switch是使用全等进行比较，是**不会进行类型转换**的

for in的使用

```js
for(var num in nums) {
	alert(num);
} 
```

with的使用:

```js
with(location){
	var qs = search.substring(1);
	var url = href; //location.href
}
```

其他的如 while, for, continue, break 等与其他编程语言语法一样

## 函数

ECMAScript中的参数在函数内部用一个数组表示，在函数体内可以通过**arguments**对象来访问这个参数数组，从而获取传递给函数的每一个参数。arguments对象只是与数组类似，它并不是Array的实例，可使用方括号语法来访问它的每一个元素，用length属性来确定传递进来多少个参数。

```js
function howManyArgs() {
	alert(arguments.length);
}
howManyArgs(“string”, 45); //2
howManyArgs(); //0
howManyArgs(12); //1


function doAdd() {
	if(arguments.length == 1) {
		alert(arguments[0] + 10);
	} else if (arguments.length == 2) {
		alert(arguments[0] + arguments[1]);
	}
}
doAdd(10); //20
doAdd(30, 20); //50
```

因此，**命名参数只提供便利，但不是必需的**。且arguments对象可以与命名参数一起使用。且arguments的值用于与对应命名参数的值保持同步（在ECMAScript 5中无效）。

由于不存在函数签名的特性，ECMAScript函数**没有重载**，即定义了两个名字相同的函数，则该名字只属于后定义的函数