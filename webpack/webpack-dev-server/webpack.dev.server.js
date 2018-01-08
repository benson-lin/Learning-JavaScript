var path = require('path');
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var compiler = webpack({
    entry: {},
    output: {
        path: path.join(__dirname, 'dev'),
        filename: '[name].js',
        publicPath: ''
    }
});

var server = new WebpackDevServer(compiler, {
  inline: true,

  quiet: false,
  noInfo: false,

  contentBase: "./dev",

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },

  publicPath: "/",

  headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true" },

  stats: { colors: true }
});

server.listen(9090);
