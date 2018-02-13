import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

gulp.task('sass', () => {
	return gulp.src('src/components/**/**.sass')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer('last 10 version'))
		.pipe(gulp.dest('public/css'))
});