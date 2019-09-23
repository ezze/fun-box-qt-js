import webpack from 'webpack';
import yargs from 'yargs';
import path from 'path';

import HtmlPlugin from 'html-webpack-plugin';
import htmlTemplate from 'html-webpack-template';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import packageJson from './package';

const PORT = process.env.PORT ? process.env.PORT : 6006;

const { argv } = yargs;
const { mode } = argv;

export default {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: PORT
  },
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: ['core-js/stable', 'regenerator-runtime/runtime', './index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].' + (mode === 'development' ? '' : '[chunkhash:6].') + 'js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(sass|scss)$/,
      use: [
        { loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' } },
        'css-loader',
        { loader: 'postcss-loader', options: { sourceMap: 'inline' } },
        { loader: 'resolve-url-loader', options: { keepQuery: true } },
        { loader: 'sass-loader', options: { sourceMap: true } }
      ],
      include: [
        path.resolve(__dirname, 'src')
      ]
    }, {
      test: /\.(eot|svg|ttf|woff2?)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[1].[hash:6].[ext]',
          regExp: /([^./]+)\\.[^.]+$/
        }
      },
      include: [
        path.resolve(__dirname, 'src/fonts')
      ]
    }, {
      test: /\.(jpg|png)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[1].[hash:6].[ext]',
          regExp: /([^./]+)\.[^.]+$/
        }
      },
      include: [
        path.resolve(__dirname, 'src/img')
      ]
    }]
  },
  externals: {
    ymaps: 'ymaps'
  },
  watchOptions: {
    ignored: []
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    },
    runtimeChunk: true
  },
  performance: {
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify(mode),
      NODE_ENV: JSON.stringify(mode)
    }),
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    }),
    new MiniCssExtractPlugin({
      filename: `css/${mode === 'development' ? '[name].css' : '[name].[hash:6].css'}`,
      chunkFilename: `css/${mode === 'development' ? '[name].css' : '[name].[hash:6].css'}`
    }),
    new HtmlPlugin({
      filename: path.resolve(__dirname, 'dist/index.html'),
      inject: false,
      template: htmlTemplate,
      title: 'Fun-Box qualification test',
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,shrink-to-fit=no'
      }, {
        'http-equiv': 'Cache-Control',
        content: 'no-cache, no-store, must-revalidate'
      }, {
        'http-equiv': 'Pragma',
        content: 'no-cache'
      }, {
        'http-equiv': 'Expires',
        content: '0'
      }],
      scripts: [
        'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
      ],
      appMountId: 'root',
      minify: {
        collapseWhitespace: mode === 'production'
      }
    })
  ],
  devtool: mode === 'development' ? 'source-map' : false
};
