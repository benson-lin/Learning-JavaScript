var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: {
		'app': './src/app.js',
	},
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].bundle.js',
		// publicPath: 'http://www.cdn.com'
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
			{test:/\.html$/,use: {loader: 'html-loader'}},
			{

				test:/\.(jpg|png|gif|svg)$/i,
				use:[
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'img/[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							gifsicle: {
								interlaced: false
							},
							optipng: {
								optimizationLevel: 7
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							mozjpeg: {
								progressive: true,
								quality: 65
							}
						}
					}
				]
			}
			//npm  babel-loader babel-core babel-preset-env style-loader postcss-loader postcss-import autoprefixer less less-loader node-sass sass-loader html-loader
			//file-loader image-webpack-loader url-loader
			//--save-dev
		]
	}
}
