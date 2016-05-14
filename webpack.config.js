var path = require('path');

module.exports = {
  entry: './src/main',

  output: {
    path: path.join(__dirname, './dist'),   //文件地址，使用绝对路径
    filename: '[name].js',
    publicPath: '/dist/'   //公共文件生成的地址
  },

  devServer: {
    historyApiFallback: true,
    hot: false,
    inline: true,
    grogress: true
  },

  //加载器
  module: {
    //loader 的执行顺序是从右至左滴
    loaders: [
      { test: /\.vue$/, loader: 'vue' },  //解析.vue文件
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }, //ES6
      { test: /\.css$/, loader: 'style!css!autoprefixer' },  //编译css并自动添加css前缀
      { test: /\.scss$/, loader: 'style!css!sass?sourceMap' }, //编译sass
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(html|tpl)$/, loader: 'html-loader'}
    ]
  },

  //vue-loader配置
  vue: {
    loaders: {
      css: 'style!css!autoprefixer'
    }
  },

  // babel-loader配置， 转换成ES6语法（ES2015）
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  resolve: {
    // require时省略扩展名，如 require('some') 即可，不需写 some.js
    extensions: ['', '.js', '.vue'],

    // 别名，可以理解成定义一个常量 fitler = 'dirname/src/filters'
    alias: {
        filter: path.join(__dirname, './src/filters'),
        components: path.join(__dirname, './src/components')
    },

    //开启source-map，webpack有多种source-map，在官网文档可以查看
    devtool: 'eval-source-map'

  }
};