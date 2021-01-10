const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(mp3|wav|mpeg|wma)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'LRRH',
      filename: 'index.html',
      meta: {
        author: 'Ricardo Valtierra',
        'og:image': { 'property': 'og:image', content: 'https://raw.githubusercontent.com/ricardovaltierra/rpg-game/development/assets/preview.jpg' },
        'linkedin:image': { 'name': 'linkedin:image', content: 'https://raw.githubusercontent.com/ricardovaltierra/rpg-game/development/assets/preview.jpg' },
        'og:url': { 'property': 'og:url', content: 'little-red-ridding-hood.netlify.app/' },
        'linkedin:card':  'summary',
        'og:description': { 'property': 'og:description', content: 'Little Red Riding Hood turn-based RPG videogame' },
        'og:title': { 'property': 'og:title', content: 'Little Red Riding Hood' },        
      },
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
};
