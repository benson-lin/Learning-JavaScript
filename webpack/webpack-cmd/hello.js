require('./world.js');
require('./style.css');


function hello(str){
	alert(str);
}

hello('world111');
//webpack hello.js hello.bundle.js --module-bind "css=style-loader!css-loader" --watch --progress --display-modules --display-reasons