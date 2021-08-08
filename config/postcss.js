/**
 * The module dependencies.
 */
const fs = require('fs-extra');
const path = require('path');
const slash = require('slash');
const utils = require('./utils');
const md5File = require('md5-file');
const settings = require('./settings');

/**
 * Copy a file using file streams.
 *
 * @param  {String} src
 * @param  {String} dist
 *
 * @return {void}
 */
const copy = (src, dist) => {
  fs.mkdirp(path.dirname(dist), (err) => {
    if (err) {
      return;
    }

    fs.createReadStream(src)
      .pipe(fs.createWriteStream(dist))
      .on('error', (err) => console.log(err));
  });
};

/**
 * Get md5 sum of a file
 *
 * @param  {String} file
 *
 * @return {Promise<String>}
 */
const md5 = (file) => {
  return new Promise((resolve, reject) => {
    md5File(file, (err, hash) => {
      if (err) {
        return resolve(null);
      }

      return resolve(hash);
    });
  });
};

/**
 * Whether files are same.
 *
 * @param  {Array<String>} files
 *
 * @return {Promise<Boolean>}
 */
const compareFiles = (files) => {
  const filesHash = files.map((file) => md5(file));

  return Promise.all(filesHash).then((results) => {
    return results.every((result, index, arr) => result === arr[0]);
  });
};

/**
 * Get file absolute dist path.
 *
 * @param  {String} file
 * @param  {String} srcBase
 * @param  {String} buildDir
 *
 * @return {String}
 */
const absolutePathDist = (file, srcBase, buildDir) => {
  let distPath = path.relative(srcBase, file);

  const rootPath = path.resolve(__dirname, '..');
  const relativeToRootPath = path.relative(rootPath, file);

  const sep = path.sep;
  const baseDirs = [
    path.join('node_modules', sep),
    path.join('src', sep, 'assets', sep, 'vendor', sep),
  ];

  baseDirs.some((dir) => {
    const matches = relativeToRootPath.indexOf(dir) === 0;

    if (matches) {
      distPath = path.relative(dir, relativeToRootPath);
    }

    return matches;
  });

  return path.resolve(buildDir, distPath);
};

/**
 * Copy assets from src to build folder and
 * keep its module name and folder structure
 *
 * @param {Object} asset
 * @param {String} dir
 * @param {String} srcBase
 * @param {String} destBase
 *
 * @type  {String}
 */
const copyAsset = (asset, dir, srcBase, destBase) => {
  const src = asset.absolutePath;
  const dist = absolutePathDist(src, srcBase, destBase);
  const files = [src, dist];

  compareFiles(files).then((same) => {
    if (same) {
      return;
    }

    return copy(src, dist);
  });

  return slash(path.relative(utils.buildStylesPath(), dist));
};

/**
 * Custom PostCSS resolve function
 * kindly borrwowed from `postcss-easy-import`
 *
 * @param  {String} id    File name
 *
 * @return {Function}
 */
function resolveCustom(id) {
  const isGlob = require('is-glob');
  const resolveGlob = require('postcss-easy-import/lib/resolve-glob');
  const resolveModule = require('postcss-easy-import/lib/resolve-module');
  const resolver = isGlob(id) ? resolveGlob : resolveModule;

  return resolver.apply(null, arguments);
}

/**
 * Export the configuration.
 */
module.exports = () => {
  const env = utils.detectEnv();
  const plugins = [];

  // Handle `@import` syntax.
  plugins.push(
    require('postcss-import')({
      extensions: '.css',
      prefix: false,
      // plugins: [
      // 	require('postcss-lazy-rules')({
      // 		images: utils.srcPath('assets/sprites/*.png'),
      // 		stylesheet: utils.srcStylesPath('_sprite.css')
      // 	})
      // ],
      resolve(id, basedir, importOptions) {
        if (id.indexOf('~') === 0) {
          return path.resolve(__dirname, '../node_modules/', id.replace('~', ''));
        } else if (id.indexOf('../vendor') === 0) {
          return utils.srcVendorPath(id);
        } else {
          return resolveCustom(utils.srcStylesPath(id), basedir, importOptions);
        }
      },
    })
  );

  // Add helpers like `clearfix`.
  plugins.push(require('postcss-utilities'));

  // Fix flexbox for IE
  plugins.push(require('postcss-flexbugs-fixes'));

  // Add vendor prefixes.
  plugins.push(
    require('autoprefixer')({
      overrideBrowserslist: settings.supportedBrowsers,
    })
  );

  // Minify the output.
  if (env.isProd) {
    plugins.push(
      require('cssnano')({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    );
  }

  return { plugins };
};
