var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');

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
    .js.pipe(gulp.dest('build/app'));
});

gulp.task('default', ['compile'], function() {
  gulp.watch(['app/**/*'], ['compile']);
});