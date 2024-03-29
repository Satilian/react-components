const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const isDev = process.env.NODE_ENV !== "production";

const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
  public: path.resolve(__dirname, "public"),
  tsconfig: path.resolve(__dirname, "tsconfig.json"),
  styles: path.resolve(__dirname, "src/styles"),
};

const rules = [
  {
    test: /\.(woff|woff2|otf|ttf|png|jpg|gif)$/,
    use: ["url-loader"],
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: { localIdentName: "[folder]_[local]-[hash:base64:5]" },
          importLoaders: 1,
        },
      },
      {
        loader: "postcss-loader",
      },
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: { transpileOnly: true },
      },
    ],
  },
];

const devServer = {
  static: paths.dist,
  compress: true,
  port: 8001,
  allowedHosts: ["*"],
  historyApiFallback: true,
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      logLevel: "debug",
    },
  },
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({ template: "../public/index.html" }),
  new MiniCssExtractPlugin({
    filename: `css/${isDev ? "[hash]." : ""}[name].css`,
    chunkFilename: `css/${isDev ? "[hash]." : ""}[name].css`,
  }),
  new ModuleFederationPlugin({
    name: "app1",
    filename: "remoteEntry.js",
    exposes: {
      "./Cropper": "components/Сropper/Cropper.tsx",
      "./Button": "components/Button/Button.tsx",
    },
    shared: { "react": { singleton: true }, "react-dom": { singleton: true } },
  }),
];

config = {
  mode: isDev ? "development" : "production",
  stats: { children: false },
  devServer,
  context: paths.src,
  entry: { app: "./index" },
  output: {
    publicPath: "auto",
  },
  resolve: { modules: ["node_modules", "src"], extensions: [".ts", ".tsx", ".js", ".jsx"] },
  module: { rules },
  plugins,
};

if (isDev) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: { configFile: paths.tsconfig },
    }),
    new ESLintPlugin({ fix: true })
  );
  config.devtool = "inline-source-map";
} else {
  plugins.push(new CopyPlugin({ patterns: [{ from: paths.public, to: paths.dist }] }));

  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: false,
  };
}

module.exports = config;
