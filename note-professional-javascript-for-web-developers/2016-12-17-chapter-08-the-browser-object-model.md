# BOM 

## Window 对象

BOM 的核心对象是 window，它表示浏览器的一个实例。在浏览器中，window对象由双重角色，它既是通过JavaScript**访问浏览器窗口的一个接口**，又是ECMAScript规定的**Global对象**。这意味着在网页中定义的任何一个对象、变量和函数，都以window作为其Global对象，因此有权访问parseInt( )等方法。

由于window对象同时扮演者ECMAScript中的Global对象的角色，因此所有在全局作用域中声明的变量、函数**都会**成为window对象的属性和方法。

```js
var age = 29;
function sayAge(){
	alert(this.age);
}
alert(window.age); //29 // 被自动归到window对象名下
sayAge(); //29
window.sayAge(); //29
```


定义全局变量与在window对象上直接定义属性的**差别**：全局变量不能通过delete操作符删除，而直接在window对象上的定义的属性更可以删除。尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

```js
var age = 20;
window.color = 'red';

delete window.age;//无法删除，返回false；IE9下报错
delete window.color;//可以删除，返回true,IE9报错

alert(window.age); //20，证明无法删除
alert(window.color);//undefined，证明删除成功


var newValue = oldValue; //报错 Uncaught ReferenceError: oldValue is not defined(…)

var newValue = window.oldValue;//newValue变成undefined
```

location，navigator其实都是window对象的属性。

**窗口关系和框架**：如果页面中包含框架，则**每个框架都拥有自己的window对象**，并且保存在frames集合中。每个window对象都有一个name属性，其中包含框架的名称。

```html
<html>
	<head>
		<title>Frameset Example</title>
	</head>
	<frameset rows=”160,*”>
	<frame src=”frame.htm” name=”topFrame”>
	<frameset cols=”50%,50%”>
		<frame src=”anotherframe.htm” name=”leftFrame”>
		<frame src=”yetanotherframe.htm” name=”rightFrame”>
	</frameset>
	</frameset>
</html>
```

可以通过window.frames[0]或windows.frames['topFrame']引用上方框架，但是最好使用top.frames[0]，因为top对象始终指向最高（最外）层的框架，也就是浏览器窗口。与top相对的另一个window对象是parent。parent（父）对象始终指向当前框架的直接上层框架，在没有框架的情况下，parent一定等于top，此时它们都等于window。

**窗口位置**：IE、Safari、Opera和Chrome都提供了screenLeft和screenTop属性，分别用于表示窗口相对于屏幕左边和上边的位置。Firefox则在screenX和screenY属性中提供相同的窗口位置信息，Safari和Chrome也同时支持这两个属性，但Opera中这两个属性与screenLeft和screenTop属性并不对应。因此，跨浏览器去的窗口左边和上边的位置代码如下：

```js
var leftPos = (typeof window.screenLeft == “number”) ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == “number”) ? window.screenTop : window.screenY;
```

注意：无法在跨浏览器的条件下取得窗口左边和上边的精确坐标值。但是使用moveTo( )和moveBy( )方法可能将窗口精确地移动到一个新位置。moveTo( )接收新位置的x和y坐标值，moveBy( )接收的是在水平和垂直方向上移动的像素数。

```js
//move the window to the upper-left coordinate
window.moveTo(0,0);

//move the window down by 100 pixels
window.moveBy(0, 100);

//move the window to position (200, 300)
window.moveTo(200, 300);
//move the window left by 50 pixels
window.moveBy(-50, 0);
```

注意：这两个方法可能会被浏览器禁用，而且在Opera和IE7及更高版本中默认就是禁用的。另外，这两个方法都不适用于框架，只能对最外层的window对象使用。


**窗口大小**：页面视口，即浏览器缩放时的真实大小。虽然最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小：

```js
var pageWidth = window.innerWidth, pageHeight = window.innerHeight;    
if(typeof pageWidth != "number"){    
    if(document.compatMode == "CSS1Compat"){    
        pageWidth = document.documentElement.clientWiidh;    
        pageHeight = document.documentElement.clientHeigth;    
    }else{    
        pageWidth = document.body.clientWiidh;    
        pageHeight = document.body.clientHeigth;    
    }    
}
```

**导航和打开窗口**：使用window.open( )方法既可以导航到一个特定的URL，也可以打开一个新的浏览器窗口。接收4个额参数：要加载的URL、窗口目标、一个特性字符串以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。**通常只需传递第一个参数**，最后一个参数只在不打开新窗口的情况边使用。

```js
//same as <a href=”http://www.wrox.com” target=”topFrame”></a>
window.open(“http://www.wrox.com/”, “topFrame”);
```

如果有一个名叫 topFrame 窗口或框架，就会在其中加载这个URL；否则就会创建一个新窗口并命名为 topFrame；第二个参数可以是下面的任一个特殊的窗口名：_self,_parent,_top或_blank

如果window.open()第二个参数不是一个已经存在的窗口或框架，这个方法就会根据第三个参数位置上传入的字符串创建一个新窗口或新标签页。如果没有传入第三个参数，会打开一个带有全部默认设置的新浏览窗口。在不打开新窗口的情况下，会忽略第三个参数。

```js
window.open(“http://www.wrox.com/”,”wroxWindow”,
“height=400,width=400,top=10,left=10,resizable=yes”);
```

**间歇调用和超时调用**：

超时调用需要使用window对象的setTimeout( )方法，接受两个参数，要执行的代码和以毫秒表示的时间。推荐第一个参数用该函数表示，不要传递字符串，因为可能会导致性能损失。经过指定的时间后，代码不一定会执行。因为JavaScript是一个单线程序的解释器，一定时间只能执行一段代码，需要在之前代码执行完毕，队列为空时才能执行。该方法在调用之后，会返回一个数值ID，表示超时调用。这个超时调用ID是计划执行代码的唯一标识，可以通过它来取消超时调用。只要在指定的时间尚未过去之前调用clearTimeout( )，就可以完全取消超时调用。

```js
//避免
setTimeout(“alert(‘Hello world!’) “, 1000);

//推荐
setTimeout(function() {
	alert(“Hello world!”);
}, 1000);

//set the timeout
var timeoutId = setTimeout(function() {
	alert(“Hello world!”);
}, 1000);

//nevermind - cancel it
clearTimeout(timeoutId);
```

间歇调用会按照指定的时间间隔重复执行代码，直至间歇调用被取消或者页面被卸载。传递参数，与用法同setTimeout( )。也会返回一个间歇调用ID，该ID用来取消。也可使用clearInterval( )方法并传入相应的间歇调用ID。取消间歇调用的重要性远高于取消超时调用。**可使用超时调用模拟间歇调用**。

```js
//avoid!
setInterval(“alert(‘Hello world!’) “, 10000);
//preferred
setInterval(function() {
	alert(“Hello world!”);
}, 10000);

var num = 0;
var max = 10;
var intervalId = null;
function incrementNumber() {
	num++;
	//if the max has been reached, cancel all pending executions
	if (num == max) {
	clearInterval(intervalId);
		alert(”Done”);
	}
}
intervalId = setInterval(incrementNumber, 500);
```


超时调用模拟间歇调用,超时调用的好处是不用跟踪超时调用ID。

```js
// 每两秒打印num，num==max后弹出Done
var num = 0;
var max = 10;
function incrementNumber() {
	num++;
	//如果执行次数未达到max设定值，则设置下一次超时调用
	if (num < max) {
		setTimeout(incrementNumber, 2000);
		console.log(num);
	} else {
		alert("Done");
	}
}
setTimeout(incrementNumber, 2000);
```


**系统对话框**：浏览器通过alert( )、confirm( )和prompt( )方法可以调用系统该对话框向用户显示消息。它们的而外观由操作系统及浏览器设置决定，而不是由CSS决定。
      
alert():向用户显示一个系统对话框，其中更包含指定的文本和一个“ok/确定”按钮。
confirm()：点击了OK返回true，点击了cancel或右上角的x按钮，返回false。
prompt():接收两个参数：要显示给用户的文本提示和文本输入域的默认值（可以是一个空字符串）。用户单击ok按钮，则prompt( )返回文本输入域的值，如果单击了Cancel或没有单击OK而是通过其他方式关闭了对话框，则该方法返回null。

浏览器引入了新特性，当前脚本哎执行过程会打开两个或多个对话框，从第二个开始都会显示一个复选框，可以阻止后续的对话框显示，除非用户刷新页面。如果两次独立的用户操作分别打开两个对话框，将不会显示复选框，只有在同一次用户操作下生成两个对话框，第二个对话框才会显示复选框。


## location 对象

location对象既是window对象的属性，也是document对象的属性；也就是说window.location和document.location都是引用同一对象。location保存着当前文档信息，还将URL解析成独立的片段，可以通过不同属性访问这些片段；

有如下属性：hash(URL的hash，可空),host(www.baidu.com:80),hostname(www.baidu.com),href(http://www.baidu.com),pathname(/wilegCDA),port(8080),protocol(http),search(?q=javascript)

**查询字符串参数**：通过search属性能够获取URL中的参数


**位置操作**：location.assign('http://www.baidu.com');立即打开新URL并在浏览器历史记录中生成一条记录保存跳转前的网页地址。window.location和location.href设置为URL时，也会用这个值调用assign()方法。

```js
//效果是一样的
window.location = “http://www.wrox.com”;
location.href = “http://www.wrox.com”;
```

在改变浏览器位置的方法中，最常用的是设置location.href属性。修改其他属性也会改变当前加载的页面。

```js
//assume starting at http://www.wrox.com/WileyCDA/
//changes URL to “http://www.wrox.com/WileyCDA/#section1”
location.hash = “#section1”;
//changes URL to “http://www.wrox.com/WileyCDA/?q=javascript”
location.search = “?q=javascript”;
//changes URL to “http://www.yahoo.com/WileyCDA/”
location.hostname = “www.yahoo.com”;
//changes URL to “http://www.yahoo.com/mydir/”
location.pathname = “mydir”;
//changes URL to “http://www.yahoo.com:8080/WileyCDA/
```

如果不想让浏览器打开新的URL但不生成新的历史记录，可以使用replace()方法。也就是说，跳转后原来跳转前的网页将不能通过后退回到原来的页面。

```js
<!DOCTYPE html>
<html>
<head>
<title>You won’t be able to get back here</title>
</head>
<body>
<p>Enjoy this page for a second, because you won’t be coming back here.</p>
<script type="text/javascript">
	setTimeout(function () {
		//location.href ='http://www.wrox.com/';
	    location.replace('http://www.wrox.com/');
	}, 1000);
</script>
</body>
</html>
```


还有一个reload方法，重新加载当前显示的页面，默认是以最有效的方式重新加载，也就是说如果上次请求以来没有修改过，则直接从浏览器缓存中重新加载。如果需要强制从服务器加载，需要传递参数true。reload()调用之后可能不会执行，取决于网络延迟或系统加载等因素。因此，reload()最后放在代码最后一行。

```js
location.reload(); //reload - possibly from cache
location.reload(true); //reload - go back to the server
```

## navigator 对象

用来识别客户端浏览器，navigator对象是所有支持JavaScript的浏览器都支持的。和其他BOM对象一样，每个浏览器中的navigator对象有自己的一套属性。


**检测插件**：对非IE浏览器而言，可以使用plugins数组达到这个目的。数组中每一项包含下列属性：name,description,filename,length。IE中需要用ActiveObject类型去创建一个特定的插件实例。IE以COM对象的方式实现插件的，而COM对象有唯一的标识，要检测是否存在，则需要先知道插件的COM标识。

```js
//plugin detection - doesn’t work in Internet Explorer
function hasPlugin(name){
	name = name.toLowerCase();
	for (var i=0; i < navigator.plugins.length; i++){
		if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1){
			return true;
		}
	}
	return false;
}

//plugin detection for Internet Explorer
function hasIEPlugin(name){
	try {
		new ActiveXObject(name);
		return true;
	} catch (ex){
		return false;
	}
}

//detect flash for all browsers
function hasFlash(){
	var result = hasPlugin(“Flash”);
	if (!result){
		result = hasIEPlugin(“ShockwaveFlash.ShockwaveFlash”);
	}
	return result;
}
```
