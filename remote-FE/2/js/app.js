requirejs.config({
	baseUrl: 'js',
	paths: {
		// 'jquery': './lib/jquery-3.2.1'
		'jquery': ['https://code.jquery.com/jquery-3.2.1','./lib/jquery-3.2.1'],
		'bootstrap': './lib/bootstrap-3.3.7/js/bootstrap.min',
		'modernizr': './lib/modernizr',
		'myCalculateNOAMD': './app/myCalculateNOAMD',
		'myCalculateAMD': './app/myCalculateAMD'
	}, 
	shim: {
		'bootstrap': ['jquery'],
		'modernizr': {//不支持AMD的有全局变量，但是require拿不到值，需要用exports
			exports: 'Modernizr'
			// deps: ['jquery'],
			// init: function($){
			// 	return $;
			// }
		},
		'myCalculateNOAMD': {
			exports: 'myCalculateF'//名字要和myCalculateNOAMD.js中的变量名一致
		}
	}
});

require(['jquery',  'modernizr', 'myCalculateNOAMD', 'myCalculateAMD', 'bootstrap'], function($, modernizr, myCalculateNOAMD, myCalculateAMD){

	console.log(myCalculateNOAMD.add(1,2));
	console.log(myCalculateAMD);
	console.log(modernizr);
	
});
