/**
 * The module dependencies.
 */
const escapeRegEx = require('escape-string-regexp');
const utils = require('./utils');
const settings = require('./settings');
const fs = require('fs');
const pkg = require('../package.json');

const path = require('path');
const resolvePath = (pathToResolve = '') => path.resolve(__dirname, pathToResolve);

const files = fs.readdirSync('../src/assets/js/');
const entry = {};

let nameFile;

files.filter((file) => {
  if (~file.indexOf('.js') || ~file.indexOf('.ts')) {
    nameFile = file.split('.')[0];
    entry[nameFile] = '../src/assets/js/' + file;
  }
});

/**
 * Setup the env.
 */
const { isProd, isDev } = utils.detectEnv();

/**
 * Babel loader setup
 */

const plugins =
  pkg.framework === 'mithril'
    ? [
        [
          '@babel/plugin-transform-react-jsx',
          {
            pragma: 'm',
            pragmaFrag: "'['",
          },
        ],
      ]
    : ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties'];

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: isDev,
    comments: false,
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: settings.supportedBrowsers,
          },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [...plugins, '@babel/plugin-proposal-nullish-coalescing-operator'],
  },
};

/**
 * Export the configuration.
 */
module.exports = {
  /**
   * The mode.
   *
   * @since webpack@4.
   */
  mode: isProd ? 'production' : 'development',

  /**
   * The output.
   */
  entry: entry,
  output: {
    jsonpFunction: `webpackJsonp_corebiz`,
    library: pkg.name,
    auxiliaryComment: pkg.name + ' Store Comment',
    filename: '[name].js',
  },
  /**
   * Setup the transformations.
   */
  module: {
    rules: [
      // Process JS files through Babel.
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolvePath('../src/assets/js')],
        exclude: /node_modules/,
        use: [babelLoader],
      },
      {
        test: /\.css$/,
        include: [resolvePath('../src/assets/js/app'), resolvePath('../src/assets/js/app/**/*')],
        use: ['css-loader'],
      },
      {
        test: /\.s(a|c)ss?$/,
        include: [resolvePath('../src/assets/js/app'), resolvePath('../src/assets/js/app/**/*')],
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
    ],
    noParse: ['raty-js'].map((module) => new RegExp(escapeRegEx(module))),
  },
  resolve: {
    extensions: ['*', '.webpack.js', '.web.js', '.js', '.ts', '.tsx', '.jsx', '.scss', '.sass'],
    alias: {
      assets: resolvePath('src/assets'),
      helpers: resolvePath('src/ts/helpers'),
    },
  },

  plugins: [],

  /**
   * Resolve the dependencies that are available in the global scope.
   */
  externals: {
    jquery: 'jQuery',
  },
  /**
   * Setup the development tools.
   */
  cache: isDev,
  bail: false,
  watch: isDev,
  devtool: isDev ? 'source-map' : false,
};
