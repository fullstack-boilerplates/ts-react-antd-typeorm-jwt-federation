import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import webpack from 'webpack'

const { ModuleFederationPlugin } = webpack.container

export default {
  entry: ['./src/web/index.ts'],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }, {
        test: /\.(png|jpe?g|gif|ttf|woff2?|eot|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(m|c)?(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              [
                "auto-import", {
                  "declarations": [
                    {
                      "default": "React",
                      "path": "react",
                    }
                  ]
                }
              ],
            ]
          }
        }
      }, {
        test: /[\/|\\]apis[\/|\\].*\.((m|c)?jsx?|tsx?)$/,
        use: {
          loader: '@shack-js/loader-fetch',
          options: {
            apiPrefix: `${process.env.PKG_ADMIN_URL}/apis`,
            backendFolder: 'src/apis',
            sourceType: 'module',
            postPath: 'shared-libs/src/exports/fetcher',
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs"]
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: join(dirname(fileURLToPath(import.meta.url)), 'src', 'web', 'index.html'),
    // }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: "admin",
      filename: "remoteEntry.js",
      exposes: {
        './src/exports/AdminRoute': './src/exports/AdminRoute.ts'
      },
      remotes: {
        "shared-libs": `shared_libs@${process.env.PKG_SHARED_LIBS_URL}/remoteEntry.js`,
      },
      shared: {
        react: {}
      }
    }),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', '.web'),
    filename: '[name].[contenthash].js',
    // publicPath: '/',
    clean: true,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  devServer: {
    historyApiFallback: true,
    hot: true,
  }
}