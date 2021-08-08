/**
 * The module dependencies.
 */
const url = require('url');
const path = require('path');
const argv = require('yargs').argv;
const utils = require('./utils');
const pkg = require('../package.json');

const ROOT_DIR = path.resolve(__dirname, '../');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build/arquivos');

var proxyMiddleware = require('http-proxy-middleware');

let jsonPlaceholderProxy = '';

if (argv.proxy) {
  jsonPlaceholderProxy = proxyMiddleware(
    ['/no-cache', '/api', '/comprejuntosku', '/buscapagina', '/buscaautocomplete'],
    {
      target: 'http://' + pkg.name + '.vtexcommercestable.com.br',
      changeOrigin: true,
      logLevel: 'debug',
    }
  );
}

let config;

if (!argv.online) {
  config = {
    port: 8000,
    open: 'external',
    files: [utils.buildPath('**/*.css'), utils.buildPath('**/*.js'), utils.buildPath('**/*.html')],
    serveStatic: [
      {
        route: ['/files'],
        dir: [BUILD_DIR],
      },
    ],
    snippetOptions: {
      rule: {
        match: /<\/body>/i,
        fn: (snippet, match) => `${snippet}${match}`,
      },
    },
    server: {
      baseDir: utils.buildPath(),
      directory: true,
      middleware: jsonPlaceholderProxy ? [jsonPlaceholderProxy] : '',
    },
    startPath: '/1-templates/index.html',
    notify: false,
    cors: true,
  };

  /**
   * Load the proxy configuration from cli arguments.
   */
  if (argv.devUrl !== undefined) {
    config.host = url.parse(argv.devUrl).hostname;

    delete config.server;
  }
} else {
  config = {
    open: 'external',
    https: {
      key: './cert/server.key',
      cert: './cert/server.crt',
    },
    ui: false,
    host: `${pkg.name}.vtexlocal.com.br`,
    startpath: '/admin/login/',
    proxy: `https://${pkg.name}.vtexcommercestable.com.br`,
    serveStatic: [
      {
        route: ['/arquivos'],
        dir: [BUILD_DIR],
      },
    ],
  };
}

module.exports = config;
