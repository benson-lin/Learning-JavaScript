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
				test: /\.css$/,
				use:['style-loader','css-loader',{

					loader:'postcss-loader',
					options:{
						plugins:[require('postcss-import'),require('autoprefixer')],
						browser:['last 5 versions']}
					}
				]
			}
			//npm install postcss-loader postcss-import autoprefixer --save-dev
		]
	}
}

//npm install babel-loader babel-core babel-preset-env style-loader css-loader webpack --save-dev