# Javascript 简史

Javascript 由 ECMAScript，DOM，BOM 组成

## ECMAScript

1. JavaScript简史：Netscape Navigator中的JavaScript与Internet Explorer中的JScript各成一派，是两个不同的JavaScript版本。为了取得统一，以JavaScript1.1为蓝本定义了ECMA-262，一种名为ECMAScript新语言标准，作为JavaScript的基础。
2. JavaScript含义比ECMAScript定义的多，完整的JavaScript包括ECMAScript(核心)、BOM(文档对象模型)、DOM(浏览器对象模型)
3. ECMA-262标准没有参照Web浏览器，ECMAScript与浏览器没有依赖关系，Web浏览器只是ECMAScript可能的宿主环境之一。其他宿主环境还包括Node和Adobe Flash。
4. ECMAScript规定了这门语言的：语法、类型、语句、关键字、保留字、操作符、对象。
5. ECMAScript的兼容性定义：
支持ECMA-262描述的所有“类型、值、对象、属性、函数以及程序句法的定义”，支持Unicode字符标准

**和Javascript的关系?**

**对微软和Netscape而言，一开始ECMA-262以Netscape的Javascript1.1作为标准，但是接下来两者都没有去遵循标准，而是推出了新的自己的JScript3.0和Javascript1.2(侠义)，最终结果是两个厂商的浏览器最后都兼容ECMA-262标准，在标准上的实现可以认为是现在广义上的Javascipt。**

1. ECMAScript之所以被称谓标准，主要是因为他并没有提供实现，就像Java很多标准都只是提供一套接口API一样。
2. 简单的说呢，就是ECMAScript定义了一些JS基础API，但是他本身并没有实现这些API。实现的工作是交给了各个浏览器厂商，由于厂商的差异，导致实现的版本各种各样，同样取名也各不相同，比如微软的JScript。同理由于厂商的喜好，导致某些特定浏览器下出现了非JS标准外的API，比如IE下各种在其他浏览器不支持的函数。
3. 不管是javascript(侠义)或jscript都只是对这套标准的一个扩展。 javascript其实只是理论概念上的一个合集，它包含了标准的ECMAScript部分，也包含了各个浏览器厂商自己附加的扩展功能部分。至于实现它们的，不是它们中的哪个，而是更底层的编程语言，比如C或C++。

## DOM

Document Object Model, 文档对象模型。由于Netscape和微软在开发DHTML(动态HTML，可以直接修改外观和内容)方面各执己见，开发人员为了保持兼容性，要做额外的工作，因此要对两家加以控制，负责制定 Web 通信标准的 W3C(World Wide Web Consortium，万维网联盟)开始规划DOM。

DOM将整个页面映射为一个**多层节点结构**，HTML或XML页面中的每个组成部分都是某种类型的节点。通过 DOM 创建的表示文档的树形图，开发人员能够获得控制页面和结构的主动权。

**DOM 也是基于ECMASscript实现的，并不意味着 DOM 只是针对 Javascript，很多别的语言也实现了 DOM。**

**DOM级别：**

**DOM1：**DOM Core(如何映射基于 XML 的文档结构，以便简化对文档中任意部分的访问和操作)和DOM HTML(在 DOM 核心的基础上加以扩展，添加了针
对 HTML 的对象和方法)
**DOM2：**扩充了鼠标和用户界面事件、范围、遍历（迭代 DOM文档的方法）等细分模块，增加对CSS的支持。
	
	DOM2引入了下列新模块：
	DOM 视图（DOM Views）：定义了跟踪不同文档（例如，应用 CSS 之前和之后的文档）视图的接口
	DOM 事件（DOM Events）：定义了事件和事件处理的接口
	DOM 样式（DOM Style）：定义了基于 CSS 为元素应用样式的接口
	DOM 遍历和范围（DOM Traversal and Range）：定义了遍历和操作文档树的接口

**DOM3：**引入加载和保存文档的方法，新增验证文档的方法。


## BOM

Browser Object Model, 浏览器对象模型。 **处理浏览器的窗口与框架**。虽然没有相关的标准，或者说有存在一些事实标准(如window对象和navigator对象)，但是每个浏览器会为这些对象定义自己的属性和方法，这些问题在HTML5中会得到解决。


