var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

function join(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
	entry: {
		'app': './src/app.js',
	},
	output: {
		path: join('/dist'),
		filename: 'js/[name].bundle.js',
		publicPath: '/'
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body',
			chunks: [
				'app'
			]

		}),
		new extractTextPlugin({
	      filename: "css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
	      disable: false,
	      allChunks: true
	    })
	],
	module: {
		loaders: [
			{
				
				test: /\.js$/,
				loader: 'babel-loader',
				include: [join('/src')],
				exclude: join('/node_modules'), 
				// options: {
				// 	presets: ['env']
				// }
			},
			{
				test: /\.(css|less|scss)$/,
				loader: extractTextPlugin.extract({
					fallback: 'style-loader',
					use:[{
				            loader: 'css-loader',
				            options: {
				              sourceMap: true
				            }
				        },{

							loader:'postcss-loader',
							options:{
								plugins:[require('postcss-import'),require('autoprefixer')],
								browser:['last 5 versions'],
								sourceMap: true
							}
						}, {
				            loader: 'less-loader',
				            options: {
				                sourceMap: true
				            }
				        }, {
				            loader: 'sass-loader',
				            options: {
				                sourceMap: true
				            }
				        }
					]

				})
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
			//file-loader image-webpack-loader url-loader  extract-text-webpack-plugin

			//--save-dev
		]
	}
}
