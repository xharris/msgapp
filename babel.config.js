const {resolve} = require('path')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [resolve('./src')],
        alias: {
          views: './src/js/views',
          api: './src/js/api',
          style: './src/style',
        },
      },
    ],
  ],
}
