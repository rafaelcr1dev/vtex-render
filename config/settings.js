// Enable the processing of JS files with webpack.
module.exports.enableWebpack = true;

// Setting for padding between the images in the sprite
// https://github.com/2createStudio/postcss-sprites
// https://github.com/Ensighten/spritesmith#padding
module.exports.spritePadding = 4;

// Settings for images optimization
// https://github.com/sindresorhus/gulp-imagemin
module.exports.imageminSettings = {
  pngquant: true,
  optipng: false,
  zopflipng: true,
  jpegRecompress: false,
  mozjpeg: true,
  guetzli: false,
  gifsicle: true,
  svgo: true,
  concurrent: 10,
  quiet: false, // defaults to false
};

// Autoprefixer setting for browsers to support
// https://github.com/postcss/autoprefixer#browsers
module.exports.supportedBrowsers = ['last 10 version', '> 1%', 'IE 10-11'];
