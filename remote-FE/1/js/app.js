requirejs.config({
	baseUrl: 'js',
	paths: {
		// 'jquery': './lib/jquery-3.2.1'
		'jquery': ['https://code.jquery.com/jquery-3.2.1','./lib/jquery-3.2.1'],
		'helper2': './helper'
	}
});

require(['jquery', './app/api'], function($, api){
	$("#get").click(function(){

		api.getUser().then(function(user){
			console.log(user);
		});

	});
	
});


require(['helper2'], function(helper){
	console.log(helper);
	
});