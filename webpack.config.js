var webpack=require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
      path:__dirname+'/public',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react' , 'stage-0']
          }
        },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, 
        { test: /\.css$/, loader: 'style-loader!css-loader' }
      ]
    },
    devServer:{
      // historyApiFallback: true,
      inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin()
   ]
  }