// entry -> output
const path = require('path')
module.exports = {
    entry: './src/app.js',
    output: {
        //2 things
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development'

}
console.log(path.join(__dirname, 'public'));