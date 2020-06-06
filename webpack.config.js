// entry -> output
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = () => {

    const MiniCSSExtract = new MiniCssExtractPlugin({
        filename: 'styles.css'
      });
    return {
        entry: './src/app.js',
        output: {
            //2 things
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
            ]
        },
        plugins: [
            MiniCSSExtract
        ],
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public')
        }
    
    }
}
