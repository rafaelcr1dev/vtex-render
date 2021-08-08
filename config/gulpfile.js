/**
 * The module dependencies.
 */
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-sass');
const utils = require('./utils');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const bundler = require('webpack');
const posthtml = require('gulp-posthtml');
const image = require('gulp-image');
const settings = require('./settings');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const vtexTemplateLoader = require('../loaders/vtex-template-loader');
const injectSvg = require('../loaders/gulp-inject-svg');
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const csso = require('gulp-csso');
const merge = require('merge-stream');
const linthtml = require('@linthtml/gulp-linthtml');
const eslint = require('gulp-eslint');
const gulpStylelint = require('gulp-stylelint');
const gulpclean = require('gulp-clean');
const replace = require('gulp-replace');
const cache = require('gulp-cache');
const gulpMultiProcess = require('gulp-multi-process');

const pkg = require('../package.json');

/**
 * Setup the env.
 */
const { isProd, isDev } = utils.detectEnv();
const prefix_to_files = pkg.storeNameToRenamesFiles ? pkg.storeNameToRenamesFiles + '-' : '';
const REGEX_NAMESTORE = /NAMESTORE-/g;
const DIR_ROOT = '../build';

/**
 * Show notification on error.
 */
const error = function (e) {
  notify.onError({
    title: 'Gulp',
    message: e.message,
    sound: 'Beep',
  })(e);

  this.emit('end');
};

/**
 * Process Sass files through Sass and PostCSS.
 */
const styles = () => {
  const config = require('./postcss');
  const src = utils.srcStylesPath('*.scss');

  const folderBuilder = isProd ? 'css' : '';
  const dest = utils.buildStylesPath(folderBuilder);

  buffer();

  return gulp
    .src([src, utils.srcStylesPath('*.css')])
    .pipe(sass().on('error', error))
    .pipe(gulpif(isDev, plumber({ errorHandler: error })))
    .pipe(postcss(config))
    .pipe(
      rename(function (path) {
        if (String(path.basename).indexOf('checkout') > -1) {
          return;
        }

        const prefix = prefix_to_files;
        const suffix = prefix_to_files ? '.min' : '';

        path.basename = prefix + path.basename + suffix;
      })
    )
    .pipe(gulp.dest(dest));
};

const stylesFiles = () => {
  const config = require('./postcss');
  const src = utils.srcStylesPath('checkout*.scss');

  const folderBuilder = isProd ? 'files' : '';
  const dest = utils.buildPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(sass().on('error', error))
    .pipe(gulpif(isDev, plumber({ errorHandler: error })))
    .pipe(postcss(config))
    .pipe(gulp.dest(dest));
};

const style = (file) => {
  const config = require('./postcss');
  const folderBuilder = isProd ? 'css' : '';
  const dest = utils.buildStylesPath(folderBuilder);

  buffer();

  return gulp
    .src(file)
    .pipe(gulpif(isDev, plumber({ errorHandler: error })))
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(
      gulpStylelint({
        failAfterError: true,
        reporters: [
          {
            formatter: 'string',
            console: true,
            fix: true,
          },
        ],
      })
    )
    .pipe(sass().on('error', error))
    .pipe(gulpif(!isDev, postcss(config)))
    .pipe(
      rename({
        suffix: prefix_to_files ? '.min' : '',
        prefix: prefix_to_files,
      })
    )
    .pipe(gulpif(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(dest));
};

const taskStyleLint = () => {
  const src = utils.srcStylesPath('*.scss');

  return gulp
    .src(src)
    .pipe(
      plumber({
        errorHandler: console.error,
      })
    )
    .pipe(sass().on('error', error));
};

const taskStyleLintWatch = () => {
  gulp.watch([utils.srcStylesPath('*.scss')], taskStyleLint);
};

const taskScriptsLint = () => {
  return gulp
    .src([utils.srcScriptsPath('*.js'), utils.srcScriptsPath('**/*.js')])
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      eslint({
        configFile: '../.eslintrc',
        globals: ['jQuery', '$'],
        envs: ['browser'],
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.formatEach('compact', process.stderr));
};

const taskScriptsLintWatch = () => {
  gulp.watch([utils.srcScriptsPath('*.js'), utils.srcScriptsPath('**/*.js')], taskScriptsLint);
};

/**
 * Process JS files through Webpack.
 */
const scripts = () => {
  const src = utils.srcScriptsPath('*.js');
  const folderBuilder = isProd ? 'js' : '';
  const directory = isProd ? [utils.srcScriptsPath('!checkout*.js'), src] : src;
  const dest = utils.buildScriptsPath(folderBuilder);

  return gulp
    .src(directory)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulpif(settings.enableWebpack, webpack(require('./webpack'), bundler)))
    .pipe(
      rename(function (path) {
        if (String(path.basename).indexOf('checkout') > -1) {
          return;
        }

        const prefix = prefix_to_files;
        const suffix = prefix_to_files ? '.min' : '';

        path.basename = prefix + path.basename + suffix;
      })
    )
    .pipe(gulpif(isProd && !settings.enableWebpack, uglify()))
    .pipe(gulp.dest(dest));
};

const scriptsFilesTemp = () => {
  const src = utils.srcScriptsPath('checkout*.js');
  const dest = utils.buildPath('files_temp');

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(eslint.format())
    .pipe(eslint.formatEach('compact', process.stderr))
    .pipe(gulpif(settings.enableWebpack, webpack(require('./webpack'), bundler)))
    .pipe(gulpif(isProd && !settings.enableWebpack, uglify()))
    .pipe(gulp.dest(dest));
};

const scriptsFiles = () => {
  const src = utils.buildPath('files_temp/checkout*.js');
  const dest = utils.buildPath('files');

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulp.dest(dest));
};

const scriptLint = (file) => {
  return gulp
    .src(file)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      eslint({
        configFile: '../.eslintrc',
        globals: ['jQuery', '$'],
        envs: ['browser'],
      })
    )
    .pipe(eslint.format())
    .pipe(eslint.formatEach('compact', process.stderr));
};

/**
 * Process HTML files through PostHTML.
 */
const pages = () => {
  const src = isDev
    ? [
        utils.srcPath('**/*.html'),
        `!${utils.srcPath('assets/*.html')}`,
        `!${utils.srcPath('3-placeholders')}`,
        `!${utils.srcPath('3-placeholders/**')}`,
        `!${utils.srcPath('4-controles-customizados')}`,
        `!${utils.srcPath('4-controles-customizados/**')}`,
        `!${utils.srcPath('controllers/')}`,
        `!${utils.srcPath('controllers/**')}`,
      ]
    : [
        utils.srcPath('**/*.html'),
        `!${utils.srcPath('1-templates/checkout-*.html')}`,
        `!${utils.srcPath('assets/*.html')}`,
        `!${utils.srcPath('controllers/')}`,
        `!${utils.srcPath('controllers/**')}`,
        `!${utils.srcPath('emails/')}`,
        `!${utils.srcPath('emails/**')}`,
        `!${utils.srcPath('3-placeholders')}`,
        `!${utils.srcPath('4-controles-customizados')}`,
      ];

  const dest = utils.buildPath();

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulpif(isDev, vtexTemplateLoader({})))
    .pipe(gulp.dest(dest));
};

const pagesFiles = () => {
  const src = [utils.srcPath('1-templates/sub-templates/checkout*.html')];

  const dest = utils.buildPath('files');

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulpif(isDev, vtexTemplateLoader({})))
    .pipe(
      gulpif(
        isDev,
        linthtml([
          {
            linthtml: '../.linthtmlrc',
          },
        ])
      )
    )
    .pipe(gulpif(isDev, linthtml.format()))
    .pipe(gulpif(isDev, linthtml.failOnError()))
    .pipe(gulp.dest(dest));
};

/**
 * Process HTML files emails.
 */
const emailsColors = () => {
  const src = [utils.srcEmailPath('**/*.html')];

  const dest = utils.srcEmailPath();

  return gulp
    .src(src)
    .pipe(replace(/#1976d2/g, pkg.color))
    .pipe(gulp.dest(dest));
};

const emailsStoreName = () => {
  const src = [utils.srcEmailPath('**/*.js')];

  const dest = utils.srcEmailPath();

  return gulp
    .src(src)
    .pipe(replace(/corebiz/g, pkg.name))
    .pipe(gulp.dest(dest));
};

/**
 * Copy files to build path.
 */
const copy = () => {
  const src = isDev
    ? [
        utils.srcPath('**'),
        `!${utils.srcPath('**/*.html')}`,
        `!${utils.srcPath('3-placeholders')}`,
        `!${utils.srcPath('3-placeholders/**')}`,
        `!${utils.srcPath('4-controles-customizados')}`,
        `!${utils.srcPath('4-controles-customizados/**')}`,
        `!${utils.srcPath('controllers/')}`,
        `!${utils.srcPath('controllers/**')}`,
        `!${utils.srcPath('assets/')}`,
        `!${utils.srcPath('assets/**')}`,
      ]
    : [
        utils.srcPath('**'),
        `!${utils.srcPath('**/*.html')}`,
        `!${utils.srcPath('assets/')}`,
        `!${utils.srcPath('assets/**')}`,
        `!${utils.srcPath('controllers/')}`,
        `!${utils.srcPath('controllers/**')}`,
        `!${utils.srcPath('emails/')}`,
        `!${utils.srcPath('emails/**')}`,
      ];
  const dest = utils.buildPath();

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulp.dest(dest));
};

const vendor = () => {
  const src = [
    utils.srcVendorPath('*.{js}'),
    `!${utils.srcImagesPath('_bkp*')}`,
    `!${utils.srcImagesPath('_bkp/*')}`,
  ];

  const folderBuilder = isProd ? 'js' : '';
  const dest = utils.buildVendorPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      rename({
        prefix: prefix_to_files,
      })
    )
    .pipe(gulp.dest(dest));
};

const fonts = () => {
  const src = utils.srcFontsPath('**/*');

  const folderBuilder = isProd ? 'css' : '';
  const dest = utils.buildFontsPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(rename(renameFontsFilesControl))
    .pipe(gulp.dest(dest));
};

const temps = () => {
  const src = utils.srcImagesPath('temp/*');
  const folderBuilder = isProd ? 'images' : '';
  const dest = utils.buildImagesPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      rename({
        prefix: prefix_to_files,
      })
    )
    .pipe(gulp.dest(dest));
};

const icons = () => {
  const src = utils.srcImagesPath('icons/*');
  const folderBuilder = isProd ? 'images' : '';
  const dest = utils.buildImagesPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      rename({
        prefix: prefix_to_files,
      })
    )
    .pipe(gulp.dest(dest));
};

/**
 * Copy all images used in HTML files.
 */
const images = () => {
  const folderBuilder = isProd ? 'images' : '';

  const src = [
    utils.srcImagesPath('**/**'),
    `!${utils.srcImagesPath('_bkp*')}`,
    `!${utils.srcImagesPath('_bkp/*')}`,
    `!${utils.srcImagesPath('temp*')}`,
    `!${utils.srcImagesPath('temp/*')}`,
    `!${utils.srcImagesPath('icons*')}`,
    `!${utils.srcImagesPath('icons/*')}`,
  ];
  const dest = utils.buildImagesPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      rename(function (path) {
        if (String(path.basename).indexOf('produto') > -1) {
          return;
        }

        const prefix = prefix_to_files;

        path.basename = prefix + path.basename;
      })
    )
    .pipe(gulp.dest(dest));
};

/**
 * Optimize all images in the build folder.
 */
const optimize = () => {
  const src = isProd
    ? utils.buildImagesPath('images/*.{jpg,jpeg,png,gif}')
    : utils.buildImagesPath('*.{jpg,jpeg,png,gif}');

  const folderBuilder = isProd ? 'images' : '';
  const dest = utils.buildImagesPath(folderBuilder);

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(image(settings.imageminSettings))
    .pipe(gulp.dest(dest));
};

/**
 * Compile a single html page
 */

const getDirectory = (file) => {
  if (~file.indexOf('sub-templates')) {
    return '1-templates/sub-templates';
  } else if (~file.indexOf('1-templates')) {
    return '1-templates';
  } else if (~file.indexOf('2-prateleira')) {
    return '2-prateleira';
  } else if (~file.indexOf('emails')) {
    return 'emails';
  }

  return;
};

const page = (file) => {
  const directory = getDirectory(file);
  const dest = utils.buildPath(directory);

  file = file.replace('/src', '/build');

  return gulp
    .src(file)
    .pipe(plumber({ errorHandler: error }))
    .pipe(gulpif(isDev, vtexTemplateLoader({})))
    .pipe(gulp.dest(dest));
};

const pageLint = (file) => {
  return gulp
    .src(file)
    .pipe(plumber({ errorHandler: error }))
    .pipe(
      linthtml({
        configFile: '../.linthtmlrc',
      })
    )
    .pipe(gulpif(isDev, vtexTemplateLoader({})))
    .pipe(linthtml.format())
    .pipe(linthtml.failOnError());
};

/**
 * Compile a single html page
 */
const sprites = () => {
  const src = utils.srcPath('./assets/sprites/*.png');

  const task = gulp.src(src);
  var spriteData = task.pipe(
    spritesmith({
      imgName: prefix_to_files + 'sprite-secondary.png',
      cssName: 'sprites.scss',
      imgPath: '/arquivos/' + prefix_to_files + 'sprite-secondary.png',
    })
  );

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img.pipe(buffer()).pipe(gulp.dest(utils.buildImagesPath()));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css.pipe(csso()).pipe(gulp.dest(utils.srcStylesPath('sprite')));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
};

/**
 * Compile rename pages
 */

const renamePrefixFilesControl = (path) => {
  if (path.basename.indexOf(prefix_to_files) == -1) {
    path.basename = prefix_to_files + path.basename;
  }

  return path;
};

const renameFontsFilesControl = (path) => {
  if (path.basename.indexOf(prefix_to_files) == -1) {
    path.basename = prefix_to_files + path.basename;
    path.extname = path.extname + '.css';
  }

  return path;
};

const insertPrefixTemplatesHtmls = () => {
  const dest = utils.srcPath('1-templates');
  const src = utils.srcPath('1-templates/*.html');

  return gulp
    .src(src)
    .pipe(gulpclean({ force: true }))
    .pipe(replace(REGEX_NAMESTORE, prefix_to_files))
    .pipe(rename(renamePrefixFilesControl))
    .pipe(gulp.dest(dest));
};

const insertPrefixSubTemplatesHtmls = () => {
  const dest = utils.srcPath('1-templates/sub-templates');
  const src = utils.srcPath('1-templates/sub-templates/*.html');

  return gulp
    .src(src)
    .pipe(gulpclean({ force: true }))
    .pipe(replace(REGEX_NAMESTORE, prefix_to_files))
    .pipe(rename(renamePrefixFilesControl))
    .pipe(gulp.dest(dest));
};

const insertPrefixShelvesTemplatesHtmls = () => {
  const dest = utils.srcPath('2-prateleira');
  const src = utils.srcPath('2-prateleira/*.html');

  return gulp
    .src(src)
    .pipe(gulpclean({ force: true }))
    .pipe(replace(REGEX_NAMESTORE, prefix_to_files))
    .pipe(rename(renamePrefixFilesControl))
    .pipe(gulp.dest(dest));
};

const insertNamestoreInFiddlerFile = () => {
  const src = utils.configPath('fiddler.farx');

  return gulp
    .src(src)
    .pipe(replace(REGEX_NAMESTORE, prefix_to_files))
    .pipe(rename(renamePrefixFilesControl))
    .pipe(gulp.dest('../'));
};

/**
 * Watch for changes and run through different tasks.
 */
const watch = () => {
  gulp
    .watch(
      [
        utils.srcStylesPath('modules/*.scss'),
        utils.srcStylesPath('modules/*.css'),
        utils.srcStylesPath('libs/*.scss'),
        utils.srcStylesPath('libs/*.css'),
        utils.srcStylesPath('package/*.scss'),
        utils.srcStylesPath('package/*.css'),
      ],
      { queue: false }
    )
    .on('change', () => {
      setTimeout(() => {
        styles();
      });
    });

  gulp
    .watch([utils.srcStylesPath('*.scss'), utils.srcStylesPath('*.css')], { queue: false })
    .on('change', (file) => {
      style(file);
    });

  gulp.watch([utils.srcScriptsPath('*.js')]).on('change', (file) => {
    scriptLint(file);
  });

  gulp.watch([utils.srcPath('./assets/sprites/*.png')], sprites);

  gulp.watch([utils.srcPath('1-templates/*.html')]).on('change', (file) => {
    page(file, '');
    pageLint(file);
  });

  gulp.watch([utils.srcPath('1-templates/sub-templates/*.html')]).on('change', (file) => {
    pageLint(file);
    pages();
  });

  gulp.watch([utils.srcPath('2-prateleira/*.html')]).on('change', (file) => {
    pageLint(file);
    pages();
  });

  gulp.watch([utils.srcPath('3-placeholders/*.html')], pages);

  gulp.watch([utils.srcPath('4-controles-customizados/*.html')], pages);

  gulp.watch([utils.srcPath('controllers/*.html')], pages);

  gulp.watch([utils.srcPath('emails/**/*.html')], pages);

  gulp.watch(
    isDev
      ? [
          utils.srcPath('**'),
          `!${utils.srcPath('assets/{scss,css,fonts,images,js,vendor}/')}`,
          `!${utils.srcPath('assets/{scss,css,fonts,images,js,vendor}/**')}`,
          `!${utils.srcPath('assets/**/*.html')}`,
          `!${utils.srcPath('1-templates/*.html')}`,
          `!${utils.srcPath('1-templates/sub-templates/*.html')}`,
          `!${utils.srcPath('2-prateleira/**.html')}`,
          `!${utils.srcPath('3-placeholders/*.html')}`,
          `!${utils.srcPath('4-controles-customizados/*.html')}`,
        ]
      : [
          utils.srcPath('**'),
          `!${utils.srcPath('assets/{scss,css,fonts,images,js,vendor}/')}`,
          `!${utils.srcPath('assets/{scss,css,fonts,images,js,vendor}/**')}`,
          `!${utils.srcPath('assets/**/*.html')}`,
          `!${utils.srcPath('controllers/')}`,
          `!${utils.srcPath('controllers/**')}`,
          `!${utils.srcPath('emails/')}`,
          `!${utils.srcPath('emails/**')}`,
        ],
    copy
  );

  gulp.watch([utils.srcVendorPath('**/*')], vendor);

  gulp.watch([utils.srcImagesPath('**/*')], images);
};

/**
 * Refresh the browser when a file is changed.
 */
const reload = () => {
  setTimeout(() => {
    browserSync.stream();

    const config = require('./browsersync');

    browserSync.init(config);
  }, 5000);
};

const svgInject = () => {
  const src = [
    utils.srcPath('**/*.html'),
    `!${utils.srcPath('**/*head.html')}`,
    `!${utils.srcPath('**/*scripts.html')}`,
    `!${utils.srcPath('assets/*.html')}`,
    `!${utils.srcPath('controllers/')}`,
    `!${utils.srcPath('controllers/**')}`,
    `!${utils.srcPath('emails/')}`,
    `!${utils.srcPath('emails/**')}`,
  ];

  const dest = utils.srcPath();

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(injectSvg({ base: DIR_ROOT }))
    .pipe(gulp.dest(dest));
};

/**
 * Remove the build.
 */
const clean = () => {
  return del([utils.buildPath()], { force: true });
};

const cleanFilesTempBuild = () => {
  return del(
    [
      utils.buildPath('files_temp'),
      utils.buildPath('1-templates'),
      utils.buildPath('2-prateleira'),
    ],
    { force: true }
  );
};

/**
 * Process HTML files through PostHTML.
 */
const taskHtmlLint = () => {
  const config = require('./posthtml');

  const src = [
    utils.srcPath('**/*.html'),
    `!${utils.srcPath('assets/*.html')}`,
    `!${utils.srcPath('3-placeholders')}`,
    `!${utils.srcPath('3-placeholders/**')}`,
    `!${utils.srcPath('4-controles-customizados')}`,
    `!${utils.srcPath('4-controles-customizados/**')}`,
    `!${utils.srcPath('controllers/')}`,
    `!${utils.srcPath('controllers/**')}`,
  ];

  return gulp
    .src(src)
    .pipe(plumber({ errorHandler: error }))
    .pipe(posthtml(config))
    .pipe(
      linthtml({
        configFile: '../.linthtmlrc',
      })
    )
    .pipe(linthtml.format())
    .pipe(linthtml.failOnError());
};

const taskHtmlLintWatch = () => {
  gulp.watch([utils.srcPath('**/*.html')], taskHtmlLint);
};

const clearGulp = () => {
  buffer();
  browserSync.stream();
  cache.clearAll();
};

const renameTemplatesBuild = () => {
  return gulp
    .src(
      [utils.buildPath('1-templates/*.html'), '!' + utils.buildPath('1-templates/checkout-*.html')],
      { nodir: true }
    )
    .pipe(
      rename(function (path) {
        path.dirname = 'templates';
      })
    )
    .pipe(gulp.dest(utils.buildPath()));
};

const renameSubTemplatesBuild = () => {
  return gulp
    .src(
      [
        utils.buildPath('1-templates/sub-templates/**'),
        '!' + utils.buildPath('1-templates/sub-templates/checkout-*.html'),
      ],
      { nodir: true }
    )
    .pipe(
      rename(function (path) {
        path.dirname = 'sub-templates';
      })
    )
    .pipe(gulp.dest(utils.buildPath()));
};

const renameShelfsBuild = () => {
  return gulp
    .src(utils.buildPath('2-prateleira/**'), { nodir: true })
    .pipe(
      rename(function (path) {
        path.dirname = 'shelfs';
      })
    )
    .pipe(gulp.dest(utils.buildPath()));
};

gulp.task('reload', reload);

gulp.task('watch', watch);

const multiProcess = (cb) => {
  // task1 and task2 will run in different processes
  return gulpMultiProcess(['reload', 'watch'], cb, true);
};

/**
 * Register the tasks.
 */
gulp.task(
  'dev',
  gulp.series(
    clean,
    pages,
    copy,
    images,
    temps,
    icons,
    styles,
    gulp.parallel(
      clearGulp,
      vendor,
      fonts,
      scripts,
      multiProcess
      // taskScriptsLintWatch,
    )
  )
);

gulp.task(
  'build',
  gulp.series(
    clean,
    scriptsFilesTemp,
    gulp.parallel(styles, scripts, pages, copy, vendor, fonts, temps, icons, images, scriptsFiles),
    optimize,
    stylesFiles,
    pagesFiles,
    renameTemplatesBuild,
    renameSubTemplatesBuild,
    renameShelfsBuild,
    cleanFilesTempBuild
  )
);

gulp.task('sprites', gulp.series(sprites));

gulp.task('svgs', gulp.series(icons, svgInject));

gulp.task(
  'renames',
  gulp.series(
    insertPrefixTemplatesHtmls,
    insertPrefixSubTemplatesHtmls,
    insertPrefixShelvesTemplatesHtmls,
    insertNamestoreInFiddlerFile,
    emailsColors,
    emailsStoreName
  )
);

gulp.task('htmlLint', gulp.series(taskHtmlLint));

gulp.task('htmlLintWatch', gulp.series(taskHtmlLintWatch));

gulp.task('stylesLint', gulp.series(taskStyleLint));

gulp.task('stylesLintWatch', gulp.series(taskStyleLintWatch));

gulp.task('scriptsLint', gulp.series(taskScriptsLint));

gulp.task('scriptsLintWatch', gulp.series(taskScriptsLintWatch));

gulp.task('optimize', gulp.series(optimize));

/**
 * Register default gulp task.
 */
gulp.task('default', gulp.parallel('dev'));
