var htmlPlugin = require('html-webpack-plugin');
var path = require("path");
var config = require("./page.js");

module.exports = {
	entry: config.entry,
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'js/[name].js'
	},
	plugins: pages,
	resolve: {
		alias: {
			'js': path.join(__dirname, '/src/js'),
			'views':path.join(__dirname, '/src/views')
		}
	},
	devServer: {
	  contentBase: path.join(__dirname, "/dist/views"),
	  compress: true,
	  port: 9000
	}

};

var pages = (function(config){
	var pageConfig = config.pages;
	var p = [];
	for (var filename in pageConfig) {
		p.push(new htmlPlugin({
			filename: './views/'+filename+'.html',
			template: './views/'+filename+'.html',
			chunks: pageConfig[filename]
		}));
	}
	return p;
})(config);
