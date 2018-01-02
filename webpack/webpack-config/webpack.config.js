var htmlWebpackPlugin = require('html-webpack-plugin');


//7. js直接打包到html中，减少http请求
module.exports = {
	entry: {//适合多个页面打包
		'main': './src/script/main.js',
		'f': './src/script/f.js'
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name]-[chunkhash].js',
		publicPath: 'http://cdn.com'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'f.html',
			template: 'f.html',
			title: 'f',
			inject: false
		})
	]
}

// 6. chunks方式会在文件中引入多个js文件， excludeChunks
// module.exports = {
// 	entry: {//适合多个页面打包
// 		'main': './src/script/main.js',
// 		'd': './src/script/d.js',
// 		'c': './src/script/e.js'
// 	},
// 	output: {
// 		path: __dirname + '/dist',
// 		filename: 'js/[name]-[chunkhash].js',
// 		publicPath: 'http://cdn.com'
// 	},
// 	plugins: [
// 		new htmlWebpackPlugin({
// 			filename: 'd.html',
// 			template: 'd.html',
// 			title: 'd',
// 			chunks: [
// 				'main', 'd'
// 			]//,
// 			excludeChunks: ['e']//排除某些chunks之外其他都引入
// 		}),
// 		new htmlWebpackPlugin({
// 			filename: 'e.html',
// 			template: 'e.html',
// 			title: 'e',
// 			chunks: [
// 				'main', 'e'
// 			]
// 		})
// 	]
// }

//5. 不同的页面同一个模板，或者不同模板
// module.exports = {
// 	entry: {//适合多个页面打包
// 		'main': './src/script/main.js',
// 		'a': './src/script/a.js',
// 		'b': './src/script/b.js',
// 		'c': './src/script/c.js',
// 	},
// 	output: {
// 		path: __dirname + '/dist',
// 		filename: 'js/[name]-[chunkhash].js',
// 		publicPath: 'http://cdn.com'
// 	},
// 	plugins: [
// 		new htmlWebpackPlugin({
// 			filename: 'a.html',
// 			template: 'a.html',
// 			inject: false,
// 			title: 'a'
// 		}),
// 		new htmlWebpackPlugin({
// 			filename: 'b.html',
// 			template: 'b.html',
// 			inject: false,
// 			title: 'b'
// 		}),
// 		new htmlWebpackPlugin({
// 			filename: 'c.html',
// 			template: 'c.html',
// 			inject: false,
// 			title: 'c'
// 		})
// 	]
// }

// 4. 
// module.exports = {
// 	entry: {//适合多个页面打包
// 		'main': './src/script/main.js',
// 		'a': './src/script/a.js'
// 	},
// 	output: {
// 		path: __dirname + '/dist',
// 		filename: 'js/[name]-[chunkhash].js',
// 		publicPath: 'http://cdn.com'//上线需求可能是另一个值
// 	},
// 	plugins: [
// 		new htmlWebpackPlugin({
// 			template: 'index.html',
// 			inject: 'head',
// 			title: 'webpack is good',
// 			date: new Date().getTime(),
// 			minify: {//html文件压缩
// 				removeComments: true,//删除注释
// 				collapseWhitespace: true//删除空格
// 			}
// 		})
// 	]
// }

// module.exports = {
// 	// context: '',//默认是运行脚本的目录，一般是跟目录
// 	entry: {//适合多个页面打包
// 		'main': './src/script/main.js',
// 		'a': './src/script/a.js'
// 	},
// 	output: {
// 		path: __dirname + '/dist',
// 		filename: 'js/[name]-[chunkhash].js'
// 	},
// 	plugins: [
// 		new htmlWebpackPlugin({
// 			// filename: 'index.html',//'index-[hash]',
// 			template: 'index.html',//根目录,默认生成到output的path目录
// 			inject: 'head',//放到head标签中，默认是body,
// 			title: 'webpack is good',//页面中使用<%= htmlWebpackPlugin.options.title%>获取值，可以使用
// 			date: new Date().getTime()
// 		})
// 	]
// }


// 2. 
// module.exports = {
// 	// entry: ['./src/script/main.js', './src/script/a.js'],//打包多个文件到一个文件
// 	entry: {//适合多个页面打包
// 		'main': './src/script/main.js',
// 		'a': './src/script/a.js'
// 	},
// 	output: {
// 		path: __dirname + '/dist/js',
// 		filename: '[name]-[chunkhash].js'//hash对静态资源的版本号控制很好
// 	}
// }


// 1. 
// module.exports = {
// 	entry: './src/script/main.js',
// 	output: {
// 		path: __dirname + '/dist/js',
// 		filename: 'bundle.js'
// 	}
// }
// 
// 
// 
// html-webpack-plugin