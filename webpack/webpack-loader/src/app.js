import './css/common.css';
import Layer from './components/layer/layer.js'


const App = function(){
	
	var dom = document.getElementById('app');
	var layer = new Layer();
	dom.innerHTML = layer.tpl;
	
	const NUM = 1;
	//alert(NUM);
	console.log(layer);
	let set1 = new Set();
	set1.add(1);set1.add(2);
	for (let v of set1) {
		console.log(v);
	}
}

new App();