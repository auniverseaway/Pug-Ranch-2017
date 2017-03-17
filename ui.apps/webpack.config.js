const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const project = './src/main/content/jcr_root/etc/designs/pugranch';
const projectSource = project + '/src';
const projectClientLibs   = project + '/clientlibs';

module.exports = {
    entry: {
        'common/publish': [ 
            projectSource + '/common/publish/js/app.js', 
            projectSource + '/common/publish/less/app.less' 
        ],
        'common/author': [ 
            projectSource + '/common/author/js/app.js',
            projectSource + '/common/author/less/app.less' 
        ],
        'dam/publish': [ 
            projectSource + '/dam/publish/js/app.js', 
            projectSource + '/dam/publish/less/app.less' 
        ],
        'communities/publish': [ 
            projectSource + '/communities/publish/js/app.js', 
            projectSource + '/communities/publish/less/app.less' 
        ]
    },
    output: {
        path: projectClientLibs,
        filename: '[name]/js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }]
                })
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: '[name]/css/app.css', disable: false })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',

    watch: true
};