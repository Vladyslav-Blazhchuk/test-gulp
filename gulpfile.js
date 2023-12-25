const { src, dest, series, parallel, watch } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const validator = require('gulp-html')
const cleanCss = require('gulp-clean-css')
const concatCss = require('gulp-concat-css')
const browserSync = require('browser-sync').create()

// first html task
function html() {
  return src('src/index.html')
    .pipe(validator())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build/'))
    .pipe(browserSync.stream())
}

// first css task
function css() {
  return src('src/css/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCss())
    .pipe(dest('build/'))
    .pipe(browserSync.stream())
}

function watchFiles(cb) {
  watch('src/**/*.*', parallel(html, css))
}

function live() {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  })
  watch('src/**/*.*', series(html, css))
}


exports.html = html;
exports.css = css;

exports.build = parallel(html, css);
exports.watch = watchFiles;
exports.live = live;