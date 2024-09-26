const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "assets/images/**/*.+(png|jpg|jpeg|gif|svg)",
          to: "images/[name][ext]",
        },
        {
          from: "assets/sounds/**/*.+(mp3)",
          to: "sounds/[name][ext]", 
        },
      ],
    }),
    new Dotenv({
      path:
        process.env.NODE_ENV === "production"
          ? "./.env.prod"
          : process.env.NODE_ENV === "development"
            ? "./.env.dev"
            : "./.env.local",
    }),
  ],
};
