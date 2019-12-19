const gulp = require("gulp");
const terser = require("gulp-terser");

function compile() {
  return gulp
    .src("./src/**/*.js")
    .pipe(
      terser({
        mangle: true
      })
    )
    .pipe(gulp.dest("./res"));
}

function watch() {
  gulp.watch("./src/**/*.js", compile);
}

exports.watch = watch;
exports.default = compile;
