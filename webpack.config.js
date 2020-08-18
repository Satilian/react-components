const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          svgo: true,
          svgoConfig: { plugins: [{ removeViewBox: false }] },
        },
      },
      "url-loader",
    ],
  },
  {
    test: /\.module.(css|scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: isDev },
      },
      { loader: "astroturf/css-loader", options: { modules: true } },
      {
        loader: "sass-loader",
        options: { sassOptions: { includePaths: [paths.styles] } },
      },
    ],
  },
  {
    test: /\.(css|scss)$/,
    exclude: /\.module.(css|scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: { hmr: isDev },
      },
      { loader: "css-loader", options: { modules: true } },
      {
        loader: "sass-loader",
        options: { sassOptions: { includePaths: [paths.styles] } },
      },
    ],
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      { loader: "ts-loader", options: { transpileOnly: true } },
      {
        loader: "astroturf/loader",
        options: { extension: ".module.scss", enableCssProp: true },
      },
      { loader: "eslint-loader", options: { fix: true } },
    ],
  },
];

const devServer = {
  contentBase: paths.public,
  compress: true,
  port: 8000,
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
  new MiniCssExtractPlugin({ filename: "css/[name].css", chunkFilename: "css/[name].css" }),
];

config = {
  mode: isDev ? "development" : "production",
  stats: { children: false },
  devServer,
  context: paths.src,
  entry: { app: "./index" },
  output: {
    publicPath: "/",
    path: paths.dist,
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
  },
  resolve: { modules: ["src", "node_modules"], extensions: [".ts", ".tsx", ".js", ".jsx"] },
  module: { rules },
  plugins,
};

if (isDev) {
  plugins.push(
    new ForkTsCheckerWebpackPlugin({
      eslint: { enabled: true, files: "./**/*.{ts,tsx,js,jsx}" },
      typescript: { configFile: paths.tsconfig },
    })
  );
  config.devtool = "inline-source-map";
} else {
  plugins.push(new CopyPlugin({ patterns: [{ from: paths.public, to: paths.dist }] }));

  config.optimization = {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: { chunks: "all" },
  };
}

module.exports = config;
