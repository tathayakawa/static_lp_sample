require('dotenv').config();
const path = require('path');

module.exports = {
  entry: './src/index.js', // あなたのエントリーポイント
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss|\.css$/, // .scssファイルを対象とする
        use: [
          'style-loader', // スタイルをHTMLに挿入するローダー
          'css-loader',   // CSSを解釈するローダー
          'sass-loader'   // SCSSをCSSにコンパイルするローダー
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // 対象となる画像ファイルの拡張子
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8KB未満の画像はDataURLとしてバンドルに含める
              name: 'images/[name].[hash].[ext]', // 出力ファイル名の設定
            },
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public')
    },
    port: process.env.PORT || 3000,
  },
};
