var gulp = require('gulp');
var ts = require('gulp-typescript');
var eventStream = require('event-stream');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('scripts', function() {
  var tsResult = gulp.src('*.ts')
    .pipe(ts({
      declarationFiles: true,
      noExternalResolve: true
    }));

  return eventStream.merge(
    tsResult.dts.pipe(gulp.dest('_definitions')),
    tsResult.js.pipe(gulp.dest('js'))
  );
});