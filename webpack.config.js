const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    content: path.resolve(__dirname, 'src/content/content.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
    popup: path.resolve(__dirname, 'src/popup/popup.js'),
    options: path.resolve(__dirname, 'src/options/options.js'),
    iframe: path.resolve(__dirname, 'src/content/iframe.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.resolve(__dirname, 'src'),
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    postCssFlexBugsFixes,
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: false,
    }),
    new CleanWebpackPlugin((['dist'])),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      template: path.resolve(__dirname, 'src/options/options.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      template: path.resolve(__dirname, 'src/popup/popup.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['iframe'],
      filename: 'iframe.html',
      template: path.resolve(__dirname, 'src/content/iframe.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
      },
      {
        from: 'src/icons',
        to: 'icons',
      },
    ]),
    new ChromeExtensionReloader(),
  ],
  mode: 'development',
};
