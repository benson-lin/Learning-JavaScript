requirejs.config({
	baseUrl: 'js',
	paths: {
		'jquery': './lib/jquery-3.2.1',
		'text': './lib/text',
		'jquery-ui': './lib/jquery-ui/jquery-ui',
		'css': './lib/css'
	}, 
	urlArgs: '_=' + new Date().getTime(),
	// map: {
	// 	'*': {
	// 		'css': './lib/css'
	// 	}
	// },
	shim: {
		'jquery-ui': ['css!./lib/jquery-ui/jquery-ui.css', 'css!./lib/jquery-ui/jquery-ui.theme.css']
	}
});

require(['api', 'jquery-ui'], function(api){

	$("#get").click(function(){
		api.loadUser();
	});
});
