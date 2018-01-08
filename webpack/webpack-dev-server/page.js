var Config = {
	entry: {
		common: 'js/common.js',
		my: 'js/about/my.js', 
		index: 'js/blog/index.js'
	},
	pages: {
		my: ['common', 'my'],
		index: ['common', 'index']
	}
}


module.exports = Config;