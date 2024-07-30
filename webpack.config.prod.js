const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { library } = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'lib',
    assetModuleFilename: 'assets/[name]_[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/data/[name][ext]'
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
      
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })],
 
};