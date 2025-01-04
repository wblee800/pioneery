const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // 애플리케이션 진입점
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들 파일이 생성될 디렉토리
    filename: 'bundle.js', // 생성될 번들 파일 이름
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // .js 또는 .jsx 파일에 적용
        exclude: /node_modules/, // node_modules는 제외
        use: 'babel-loader', // Babel 로더 사용
      },
      {
        test: /\.css$/, // CSS 파일에 적용
        use: ['style-loader', 'css-loader'], // CSS와 스타일 로더 사용
      }, {
        rules: [
          {
            test: /\.(jpg|jpeg|png|gif|svg)$/i,
            type: 'asset/resource', // 이미지 파일을 처리하도록 설정
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 파일 확장자 생략 가능
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/static/index.html', // HTML 템플릿 파일
    }),
  ],
  devServer: {
    static: './dist', // 정적 파일 제공 경로
    hot: true, // 핫 리로딩 활성화
    allowedHosts: ['www.katechackers.com', 'katechackers.com', 'katechackers.junho85.pe.kr'],
    port: 3002, // 개발 서버 포트 설정
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:8002',
        changeOrigin: true,
        timeout: 20000, // 요청 대기 시간 (ms)
        proxyTimeout: 20000, // 프록시 대기 시간 (ms)
      }
    ],
  },
  mode: 'development', // 개발 모드
};
