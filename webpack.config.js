import path from 'node:path'
import CleanWebpackPlugin from 'clean-webpack-plugin'

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', 'tsx', 'scss'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              module: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: false,
    contentBase: '/public',
    writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
  },
  plugins: [new CleanWebpackPlugin()],
}
