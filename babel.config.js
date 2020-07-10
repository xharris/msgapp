const {resolve} = require('path')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: [resolve('./src')],
        alias: {
          component: './src/js/component',
          view: './src/js/view',
          api: './src/js/api',
          util: './src/js/util',
          style: './src/style',
        },
      },
    ],
  ],
}
