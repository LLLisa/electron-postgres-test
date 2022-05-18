module.exports = {
  entry: './src/components/index.js',
  devtool: 'source-map',
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
};
