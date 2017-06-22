const gulp         = require("gulp"),
      path         = require('path'),
      sass         = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssmin       = require('gulp-cssmin'),
      watch        = require('gulp-watch'),
      uglify       = require('gulp-uglify'),
      concat       = require('gulp-concat'),
      plumber      = require('gulp-plumber'),
      del          = require('del'),
      runSequence  = require('run-sequence'),
      browserSync  = require("browser-sync"),
      exec         = require('child_process').execSync;

/**
 * File Path
 */
const ROOT        = __dirname;
const SRC_PATH    = path.join(ROOT, './src');
const PUBLIC_PATH = path.join(ROOT, './public');

// HTML
const HTML_SRC_PATH = path.join(SRC_PATH, 'html');
const HTML_FILES    = path.join(HTML_SRC_PATH, './**/*.html');

// SASS
const SASS_SRC_PATH = path.join(SRC_PATH, 'scss');
const SASS_FILES    = path.join(SASS_SRC_PATH, './**/*.scss');
const CSS_FILES     = path.join(PUBLIC_PATH, './css/**/*.css');

// Clean Task
gulp.task('clean.release', function() {
  return del([CSS_FILES], {force: true});
});

// HTML
gulp.task('html', function() {
  return gulp.src([HTML_FILES]).pipe(gulp.dest(PUBLIC_PATH));
});

// Sass, CSS
gulp.task('sass', function() {
  return gulp.src([SASS_FILES])
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(PUBLIC_PATH + '/css'));
});

gulp.task('css.prefixer', function() {
  return gulp.src([CSS_FILES])
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 8', 'ios 6', 'android 2.3'],
      cascade: false
    }))
    .pipe(gulp.dest(PUBLIC_PATH + '/css'));
});

gulp.task('css.min', function() {
  return gulp.src([CSS_FILES])
    .pipe(cssmin())
    .pipe(gulp.dest(PUBLIC_PATH + '/css'));
});

// ファイル更新監視
gulp.task('watch', function() {
  // HTML
  gulp.watch([HTML_FILES], ['html']);

  // SCSS
  gulp.watch([SASS_FILES], ['build.css']);
});

gulp.task('browser-sync', function() {
  browserSync({
    server: "./public",
    files: ["./public/**"],
    port: 8080
  });

  browserSync.reload();
});

/**
 * Build Task
 **/
gulp.task('build.ui', function(callback) {
  return runSequence(
    ['html', 'build.css'],
    callback
  );
});

gulp.task('build.css', function(callback) {
  return runSequence(
    'sass',
    'css.prefixer',
    'css.min',
    callback
  );
});

/**
 * Dist Task
 **/
gulp.task('dist', function(callback) {
  return runSequence(
    'build.ui',
    callback
  );
});

/**
 * default Task
 **/
gulp.task('default', function(callback) {
  runSequence(
    'build.ui',
    'watch',
    'browser-sync',
    callback
  );
});
