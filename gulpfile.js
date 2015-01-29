var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  del = require('del'),
  connect = require('gulp-connect');


var paths = {
  ts: [
    'app/**/*.ts',
    '_definitions/**/**.d.ts',
    'bower_components/phaser/typescript/phaser.d.ts',
    'bower_components/phaser/typescript/pixi.d.ts'
  ],
  assets: [
    'app/**/*',
    '!app/**/*.ts',
    'bower_components/**/*'
  ]
};

gulp.task('clean', function(cb) {
  del(['build'], {force: true}, cb);
});

gulp.task('assets', ['clean'], function() {
  return gulp.src(paths.assets, {base: '.'})
    .pipe(gulp.dest('build'));
});

gulp.task('compile', ['assets'], function() {
  return gulp.src(paths.ts)
    .pipe(ts({
      noExternalResolve: true,
      module: 'amd'
    }))
    .js.pipe(gulp.dest('build/app'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  })
});

gulp.task('default', ['connect', 'compile'], function() {
  gulp.watch(['app/**/*'], ['compile']);
});