var gulp = require('gulp'),
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    prefix = require('gulp-autoprefixer');

var config = {
  src: 'src',
  dist: 'dist'
};

gulp.task('clean', function (cb) {
  del([
    config.dist + '/**'
  ], cb);
});

gulp.task('jshint', function () {
  return gulp.src('gulpfile.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('sass:nested', function () {
  return gulp.src(config.src + '/scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      sourceComments: 'map'
    }))
    .pipe(prefix(
      'last 2 version'
    ))
    .pipe(gulp.dest(config.dist));
});

gulp.task('sass:minified', function () {
  return gulp.src(config.src + '/scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(prefix(
      'last 2 version'
    ))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.dist));
});

gulp.task('default', ['clean'], function () {
  gulp.start('jshint', 'sass:nested', 'sass:minified');
});
