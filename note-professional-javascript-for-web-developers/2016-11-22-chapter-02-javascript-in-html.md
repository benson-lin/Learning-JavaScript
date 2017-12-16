# 在 HTML 中使用 JavaScript

利用`<script>`标签，有两种方式：

**1.在页面内直接写JavaScript代码**

```javascript
	<script type="text/javascript">
		function sayHi(){
			console.log("Hi");
		}
		sayHi();
	</script>
```

**2.引用外部JavaScript文件**

```javascript
<script type="text/javascript" src="sample.js"></script>
```

`<script>`标签对内不能出现`</script>`

```javascript
<script type=”text/javascript”>
function sayScript(){
alert(“</script>”);//报错
}
</script>
```



## `<script>`标签的位置


两种方式：head里面、body末尾或后面


```html
<!DOCTYPE html>
<html >
<head>
    <title>Example HTML Page</title>
    <script src="exmpale1.js"></script>
    <script src="example2.js"></script>
</head>
<body>
    <!-- contents go here -->
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>Example HTML Page</title>
</head>
<body>
    <!-- contents go here -->
    <script src="jquery.min.js"></script>
    <script src="example.js"></script>
</body>
</html>
```

**应该如何放置：**

引用外部的UI框架如Bootstrap，还有css样式，应该放在前面，因为页面渲染要使用；对自定义的js一般放到末尾。

对Jquery而言，看具体情况而定，比如有一个js要使用`$(function(){})`，那么jq的位置就应该放到这个js前面；或者说外部框架是使用了jq，那么在引入这个框架之前就应该先引入jq，也就是说哪里用要用到 jq 就把 jq 放在它前面。

如果可以放到后面的话就放到后面，因为这样可以让页面更快的出来，提高用户体验。

## 文档模式

最常见的是`<!DOCTYPE html>`

```html
<!-- HTML 4.01 Strict -->
<!DOCTYPE HTML PUBLIC “-//W3C//DTD HTML 4.01//EN”
“http://www.w3.org/TR/html4/strict.dtd”>
<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC
“-//W3C//DTD XHTML 1.0 Strict//EN”
“http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd”>
<!-- HTML5 -->
<!DOCTYPE html>
```

## 延迟脚本 defer

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <script defer="defer" src="example.js"></script>
</head>
<body>
    <!-- contents go here -->
</body>
</html>
```

`defer`属性**只有在引用外部JavaScript文件**的时候才会起作用，如果给嵌入脚本使用这个属性，则浏览器会直接忽略这个属性。而且并非所有的浏览器都支持这个属性，对于不支持此属性的浏览器也会直接忽略该属性。所以，将会导致延迟的脚本放到页面的底部仍是最佳的选择。

## 异步脚本 async

HTML5为`<script>`定义了async属性，这个属性的目的是让页面不用等待脚本的下载和执行，从而可以异步加载页面的其它内容。与延迟脚本一样，async也只适用于外部脚本。

## 嵌入代码 OR 外部文件

引用外部文件的做法会比将代码直接嵌入到HTML文件中更有优势。

- 可维护性：嵌入性的代码会在遍布在各个HTML文件中，如果项目比较大，并且页面文件比较多，就会造成一定程度的混乱，所以将所有的JavaScript文件都放到同一个目录中，维护起来会比较轻松。说得比较专业一点就是可以将结构与行为相分离。
- 可缓存：如果多个文件使用的是同一套代码，则使用外部文件的时候只需要下载一次代码就够了，这能够加快页面的加载速度。
- 适应未来：通过外部文件的方式，HTML和XHTML的语法是一样的。


## `<noscript>`元素

当浏览器不支持JavaScript的时候用来显示替代的内容。这个元素只有在以下情况中才会被显示出来；在启用了JavaScript浏览器中，用户则永远不会看到里面的消息。

- 浏览器不支持脚本
- 浏览器支持脚本，但是脚本被禁用

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <script type="text/javascript" defer="defer" src="example1.js"></script>
    <script type="text/javascript" defer="defer" src="example2.js"></script>
</head>
<body>
    <noscript>
        <p>This page does not support javascript</p>
    </noscript>
</body>
</html>
```