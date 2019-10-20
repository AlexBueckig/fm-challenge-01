const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
  pages: ['./*.html']
};

/**********************************************************/
/* CSS / SCSS                                             */
/**********************************************************/

const style = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
};

const buildStyle = () => {
  return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('.'))
    .pipe(postcss([require('autoprefixer')(), require('cssnano')()]))
    .pipe(gulp.dest('./dist/css'));
};

/**********************************************************/
/* Misc                                                   */
/**********************************************************/
const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  style();
  gulp.watch('./scss/**/*.scss', style);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
};

/**********************************************************/
/* Exports                                                */
/**********************************************************/

exports.default = watch;
exports.build = gulp.series(buildStyle);
