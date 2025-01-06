const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devServer: {
    static: './dist',
    port: 3000,
    hot: true
  },

  module: {
    // rules: [{
    //   test: /\.worker\.js$/,
    //   use: {
    //     loader: 'worker-loader',
    //     options: {
    //       inline: 'fallback'
    //     }
    //   }
    // }]
  }
}