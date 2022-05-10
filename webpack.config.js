module.exports = {
  entry: './src/components/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react'] },
      },
    ],
  },
};
