requirejs.config({
	baseUrl: 'js',
	paths: {
		// 'jquery': './lib/jquery-3.2.1'
		'jquery': ['https://code.jquery.com/jquery-3.2.1','./lib/jquery-3.2.1'],
		'bootstrap': './lib/bootstrap-3.3.7/js/bootstrap.min'
	}, 
	shim: {
		'bootstrap': ['jquery']
	},
	map: {
		'*': {
			'jquery': './lib/jquery-3.2.1'
		},
		'api2': {
			'jquery': './lib/jquery-2'
		}
	},
	urlArgs: '_=' + new Date().getTime()
});

require(['api2'], function($, modernizr){


	
});
