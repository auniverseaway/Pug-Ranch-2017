const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');

const project = './src/main/content/jcr_root/apps/pugranch/clientlibs';

module.exports = {
    entry: {
        'common/publish': [ 
            project + '/common/publish/src/js/app.js', 
            project + '/common/publish/src/less/app.less' 
        ],
        'common/author': [ 
            project + '/common/author/src/js/app.js', 
            project + '/common/author/src/less/app.less' 
        ],
        'tests/hobbes': [ 
            project + '/tests/hobbes/src/js/app.js'
        ]
    },
    output: {
        path: project,
        filename: '[name]/dist/js/app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            url: false
                        }
                    }]
                })
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({ filename: '[name]/dist/css/app.css', disable: false })
    ],
    stats: {
        colors: true
    },
    
    watch: true
};