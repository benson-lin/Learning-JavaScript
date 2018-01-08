import './css/common.css';
import layer from './components/layer/layer.js'


const App = function(){
	const NUM = 1;
	alert(NUM);
	console.log(layer);
	let set1 = new Set();
	set1.add(1);set1.add(2);
	for (let v of set1) {
		console.log(v);
	}
}

new App();