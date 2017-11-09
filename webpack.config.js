module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: "./dist/assets/js/",
    filename: "app.js"
  },
  /* ソースマップを出力させる場合は以下を追加 */
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
