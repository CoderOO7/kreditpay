const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');

module.exports = {
  entry: {
    main: `${paths.src}/index.jsx`
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // postcss loader require for tailwind, webpack auto detect postcss.config.js
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          // file types you are using in your application
          extensions: ['.js', '.jsx']
        },
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false
          }
        }
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new Dotenv({ systemvars: true, path: paths.env }),
    // prevent deletion of assets define in CopyWebpackPlugin
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.src}/assets`,
          to: 'assets',
          noErrorOnMissing: true
        }
      ]
    }),

    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`
    }),

    new webpack.ProvidePlugin({
      process: 'process/browser'
    })
  ],

  cache: {
    type: 'filesystem'
  }
};
