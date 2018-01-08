var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		'app': './src/app.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].bundle.js'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body',
			chunks: [
				'app'
			]

		})
	],
	module: {
		loaders: [
			{
				
				test: /\.js$/,
				loader: 'babel-loader',
				include: [path.resolve(__dirname,'/src')], //__dirname + '/src/',
				exclude: path.resolve(__dirname,'/node_modules'), //__dirname + '/node_modules/',
				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(css|less|scss)$/,
				use:['style-loader','css-loader',{

					loader:'postcss-loader',
					options:{
						plugins:[require('postcss-import'),require('autoprefixer')],
						browser:['last 5 versions']}
					}, 'less-loader', 'sass-loader'
				]
			},
			{test:/\.html$/,use: {loader: 'html-loader'}}
			//npm  babel-loader babel-core babel-preset-env style-loader postcss-loader postcss-import autoprefixer less less-loader node-sass sass-loader html-loader --save-dev
		]
	}
}
