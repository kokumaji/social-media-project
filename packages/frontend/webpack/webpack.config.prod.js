process.env.NODE_ENV = 'production';

const webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  merge = require('webpack-merge');

const sharedWebpackConfig = require('./webpack.config');

const productionConfig = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: 512e3,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: true })],
  },

  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new OptimizeCssAssetsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[hash].css',
      chunkFilename: '[contenthash].css',
    }),
  ],
};

module.exports = merge.smart(sharedWebpackConfig, productionConfig);
