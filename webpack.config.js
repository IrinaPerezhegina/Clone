const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

console.log( mode  + ' mode')


module.exports = {
    mode: mode,
    entry: {
        scripts: './src/index.js',
        user: './src/user.js',
    },
    output: {
        assetModuleFilename: 'assets/[hash][ext][query]',
        clean: true,
        
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        
    
},
    plugins: [
        new MiniCssExtractPlugin({
        filename: '[name].[contenthash].scss'
        }),
        new HtmlWebpackPlugin({
        filename: "index.html",
        template: './src/index.pug'
    })],
    module: {
        rules:[
            {
                test: /\.html$/i,
                loader:'html-loader' 
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    (mode === 'development') ? 'style-loader': MiniCssExtractPlugin.loader,
                   'css-loader',
                   {
                       loader: 'postcss-loader',
                       options: {
                           postcssOptions: {
                               plugins:[
                                   [
                                       'postcss-preset-env'
                                   ],
                               ],
                           },
                       },
                   },              
                    'sass-loader',
                ],
            },
            {
                 test: /\.(png|svg|jpg|ipeg|gif)$/i,
                 type:'asset/resource' 
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type:'asset/resource',
            },
            {
                test: /\.pug$/,
                loader:'pug-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                } 

            },
        ]
    },

}