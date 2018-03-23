const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const serve = require('koa-static');
const rewrite = require('koa-rewrite');

const isProdBuild = process.argv.indexOf('-p') !== -1;

const envPlugin = new webpack.DefinePlugin({
  __DEBUG__: JSON.stringify(!isProdBuild),
  __RELEASE__: JSON.stringify(isProdBuild),
  'process.env.NODE_ENV': isProdBuild ? '"production"' : '"development"'
});

const templatePlugin = new HtmlWebpackPlugin({
  template : './src/index.html',
  hash     : false,
  filename : 'index.html',
  inject   : 'body',
  minify   : {
    collapseWhitespace : true
  },
});

const config = {
  mode: isProdBuild ? 'production' : 'development',
  entry: {
    'assets/app': './src/index.js',
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'app'),
    publicPath: isProdBuild ? '/' : 'http://localhost:8888/' // Required for webpack-serve
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx', '.scss']
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ]
  },
  plugins: [
    envPlugin,
    templatePlugin,
  ],
};

if(!isProdBuild) {
  config.serve = {
    content: "./app",
    add: function(app, middleware, options) {
      // since we're manipulating the order of middleware added, we need to handle
      // adding these two internal middleware functions.
      middleware.webpack();
      middleware.content();

      app.use(serve('./app'));
    }
  }
}

module.exports = config;
