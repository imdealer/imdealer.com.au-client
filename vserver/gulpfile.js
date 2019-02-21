const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCss = require('gulp-clean-css');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const del = require('del');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const minimist = require('minimist');

const knownOptions = {
  string: 'html',
  default: { html: 'index.html' }
};

const options = minimist(process.argv.slice(2), knownOptions);

function syncBrowser() {
  browserSync.init({
    server: {
      baseDir: './src',
      index: options.html
    }
  });
}

function compileSass() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
}

function reloadingHtml() {
  return gulp.src('./src/*.html').pipe(browserSync.reload({
    stream: true
  }));
}

function reloadingJs() {
  return gulp.src('./src/js/**/*.js').pipe(browserSync.reload({
    stream: true
  }));
}

function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', gulp.series(compileSass));
  gulp.watch('./src/*.html', gulp.series(reloadingHtml));
  gulp.watch('./src/js/**/*.js', gulp.series(reloadingJs));
}

function userefTask() {
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulpif('*.css', cleanCss()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('./dist'));
}

function copyFonts() {
  return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts'));
}

function copyAssets() {
  return gulp.src('./src/assets/**/*').pipe(gulp.dest('./dist/assets'));
}

function cleanDist(cb) {
  del.sync('./dist');
  cb();
}

function imageProcessing() {
  return gulp.src('./src/images/**/*')
    .pipe(cache(imagemin({interlaced: true})))
    .pipe(gulp.dest('./dist/images'));
}

exports.default = gulp.parallel(syncBrowser, compileSass, watchFiles);
exports.build = gulp.series(cleanDist, gulp.parallel(userefTask, copyFonts, imageProcessing, copyAssets));
