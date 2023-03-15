module.exports = function(api) {
  // Valid environments for the app
  const validEnvs = ['development', 'test', 'production'];

  // Get the current environment
  const currentEnv = api.env();

  // Check if the current environment is development, production, or test
  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');
  const isTestEnv = api.env('test');

  // Throw an error if the current environment is not valid
  if (!validEnvs.includes(currentEnv)) {
    throw new Error(
      `Please specify a valid "NODE_ENV" or "BABEL_ENV" environment variable. Valid values are "development", "test", and "production". Instead, received: ${JSON.stringify(currentEnv)}.`
    );
  }

  // Set the presets and plugins based on the current environment
  const presets = [
    // Preset for testing environment
    isTestEnv && [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        modules: 'commonjs'
      },
      '@babel/preset-react'
    ],

    // Preset for production and development environments
    (isProductionEnv || isDevelopmentEnv) && [
      '@babel/preset-env',
      {
        forceAllTransforms: true,
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        exclude: ['transform-typeof-symbol']
      }
    ],

    // Preset for all environments
    [
      '@babel/preset-react',
      {
        development: isDevelopmentEnv || isTestEnv,
        useBuiltIns: true
      }
    ]
  ].filter(Boolean);

  const plugins = [
    // Plugins for all environments
    'babel-plugin-macros',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-destructuring'],

    // Plugins for production and development environments
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true
      }
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
        corejs: false
      }
    ],
    [
      '@babel/plugin-transform-regenerator',
      {
        async: false
      }
    ],

    // Plugin for production environment
    isProductionEnv && [
      'babel-plugin-transform-react-remove-prop-types',
      {
        removeImport: true
      }
    ]
  ].filter(Boolean);

  // Return the presets and plugins as an object
  return {
    presets,
    plugins
  };
};
