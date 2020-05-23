const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  mode: 'production',
  output: {
    filename: 'material-ui-core.min.js',
    path: path.resolve(__dirname, '../../dist'),
    library: 'MaterialUi',
    libraryTarget: 'umd',
  },
  externals: {
    'react-dom': 'ReactDOM',
    'react': 'React',
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: false,
  }
}
