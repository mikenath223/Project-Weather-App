const path = require('path');
require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  entry: './src/babel-lib/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'OPEN_WEATHER_API_KEY',
      'GOOGLE_MAP_API_KEY',
      'TIMEZONE_API_KEY'
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
};