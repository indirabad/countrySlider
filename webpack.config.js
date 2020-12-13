const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const outputDir = path.resolve(__dirname, "build");
module.exports = {
  entry: path.resolve(__dirname, "index.js"),
  output: {
    path: outputDir,
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Fonts loading
          "resolve-url-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/",
          },
        },
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, "public/assets"),
        use: ["@svgr/webpack"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  externals: {
    jquery: "jQuery",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      inject: "body",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    port: 8080,
  },
};
