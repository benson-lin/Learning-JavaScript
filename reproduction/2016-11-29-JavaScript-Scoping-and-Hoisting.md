# 一、案发现场 

我们先看一段很简单的代码：

```js
var v='Hello World'; 
alert(v); 
``` 

这个没有疑问吧，弹出“Hello World”。OK，我们继续。 
我们在看一段Code： 

```js
var v='Hello World'; 
(function(){ 
alert(v); 
})() 
```

经过运行之后，我们发现，还是和我们预期的一样，弹出了“Hello World”。 
好了，有意思的来了。接着在看一段下面的代码：

```js
var v='Hello World'; 
(function(){ 
alert(v); 
var v='I love you'; 
})() 
``` 

如果这个是一个面试题，面试官问你这个结果是多少？你怎么回答？ 
我们先看结果吧！ 

结果是 undefined？和你上面自己想的一样吗？ 

好吧，我就不故弄玄虚了。其实，这里面隐藏了一个陷阱-----JavaScript中的变量提升（Hoisting）

二、深度剖析

现在我来解释下提升是什么意思？顾名思义，就是把下面的东西提到上面。在JS中，就是把定义在后面的东东（变量或函数）提升到前面中定义。 

在解释提升之前，我们先来看一下js中的作用域（scoping）问题。 

对于JavaScript新手来说scoping是最令人困惑的部分之一。事实上，不仅仅是新手，我遇到或很多有经验的JavaScript程序员也不能完全理解scoping。JavaScript的scoping如此复杂的原因是它看上去非常像C系语言的成员。请看下面的C程序：


```c
#include <stdio.h> 
int main() { 
	int x = 1; 
	printf("%d, ", x); // 1 
	if (1) { 
		int x = 2; 
		printf("%d, ", x); // 2 
	} 
	printf("%d\n", x); // 1 
} 
``` 

这段程序的输出是1,2,1。这是因为在C系语言有块级作用域(block-level scope),当进入到一个块时，就像if语句，在这个块级作用域中会声明新的变量，这些变量不会影响到外部作用域。但是JavaScript却不是这样。在Firebug中试试下面的代码：


```js
var x = 1; 
console.log(x); // 1 
if (true) { 
	var x = 2; 
	console.log(x); //2 
} 
console.log(x);// 2  
```

在这段代码中，Firebug显示1，2,2。这是因为JavaScript是函数级作用域(function-level scope)。这和C系语言是完全不同的。块，就像if语句，并不会创建一个新的作用域。只有函数才会创建新的作用域。 

对于大部分熟悉C，C++，C#或是Java的程序员来说，这是意料之外并且不被待见的。幸运的是，因为JavaScript函数的灵活性，对于这个问题我们有一个解决方案。如果你必须在函数中创建一个临时的作用域，请像下面这样做： 


```js
function foo() { 
	var x = 1; 
	if (x) { 
		(function () { 
		var x = 2; 
		// some other code 
		}()); 
	} 
// x is still 1. 
} 
```

这种方面确实非常灵活，它使用在任何需要创建一个临时作用域的地方，不仅仅是某个块中。但是，我强烈建议你花点时间好好理解下JavaScript scoping。它实在是非常强力，而且它也是我最喜欢的语言特性之一。如果你很好的理解了scoping，理解hoisting将会更加容易。 



### 2.1 变量提升 

变量提升，很简单，就是把变量提升提到函数的top的地方。我么需要说明的是，**变量提升 只是提升变量的声明，并不会把赋值也提升上来**。 



比如： 

我们定义三个变量： 

```js
(function(){ 
	var a='One'; 
	var b='Two'; 
	var c='Three'; 
})() 
```


实际上它是这样子的： 

```js
(function(){ 
	var a,b,c; 
	a='One'; 
	b='Two'; 
	c='Three'; 
})() 
```

这个时候就把变量提升了呀。 

好，我们现在回到第一段code里面。为什么会报错呢？其实，根据我么根据上面变量提升原件以及js的作用域（块级作用域）的分析，得知 上面代码真正变成如下：

```js
var v='Hello World'; 
(function(){ 
	var v; 
	alert(v); 
	v='I love you'; 
})() 
``` 

所以，才会提示说“undefined”。 

从这里，我们也学习到，我们在写js code 的时候，我么需要把变量放在块级作用域的顶端，比如我在上面所举的例子：var a,b,c;。防止出现意外。 

### 2.2 函数提升 
函数提升是把整个函数都提到前面去。 

在我们写js code 的时候，我们有2中写法，一种是函数表达式，另外一种是函数声明方式。我们需要重点注意的是，**只有函数声明形式才能被提升**。 

函数声明方式提升**【成功】 **

```js
function myTest(){ 
	foo(); 
	function foo(){ 
		alert("我来自 foo"); 
	} 
} 
myTest(); 
```



函数表达式方式提升**【失败】** 

```
function myTest(){ 
	foo(); 
	var foo =function foo(){ 
		alert("我来自 foo"); 
	} 
} 
myTest(); 
```



应该到这里基本都可以弄懂了。