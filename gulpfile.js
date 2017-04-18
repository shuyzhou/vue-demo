var gulp = require('gulp'),
  	browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
        	baseDir: "./"
        }
    });
    gulp.watch('src/**', function () {
      browserSync.reload();
    });
    gulp.watch("*.html").on('change', browserSync.reload);
});
gulp.task('dev', ['serve']);