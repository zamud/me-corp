// Needs to be in common JS (ES5)
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  target: 'node',
  node: {
    fs: 'empty',
  },
  // loaders - packages used by webpack to transform code
  module: {
    rules: [
      // Transform ES6 code into regular JS
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      // Allows us to import CSS into top of components
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },

  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
