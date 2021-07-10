function getAliasesFromTsConfig() {
  const tsConfig = require('./tsconfig.json');
  const paths = tsConfig.compilerOptions.paths;
  let alias = {};
  Object.keys(paths).forEach((key) => {
    alias[key] = `./${paths[key][0]}`;
  });
  return alias;
}

module.exports = function (api) {
  api.cache(true);

  const plugins = [
    [
      'module-resolver',
      {
        alias: getAliasesFromTsConfig(),
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        root: ['./src']
      }
    ]
  ];

  const presets = ['module:metro-react-native-babel-preset'];

  return {
    env: {
      development: {
        plugins: [
          ...plugins,
          [
            'transform-remove-console',
            { exclude: ['disableYellowBox', 'error', 'info', 'log'] }
          ]
        ],
        presets: presets
      },
      production: {
        plugins: [
          ...plugins,
          '@babel/plugin-transform-runtime',
          '@babel/plugin-transform-react-inline-elements',
          ['transform-remove-console', { exclude: ['error'] }]
        ],
        presets: presets
      }
    },
    plugins,
    presets
  };
};
