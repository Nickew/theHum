import gulp from 'gulp';

//** PLUGINS
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';

//** VARS
const SRC_DIR = './src';
const PUBLIC_DIR = './public';

gulp.task('js', () => {
	return gulp.src(SRC_DIR + '/components/**/*.js')
		.pipe(concat('components.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(SRC_DIR + '/js'));
});

gulp.task('full-js', ['js'], () => {
	return gulp.src(SRC_DIR + '/js/components.min.js')
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(SRC_DIR + '/js'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: SRC_DIR
		},
		notify: false
	});
});

gulp.task('sass', () => {
	return gulp.src([
		SRC_DIR + '/components/**/*.sass',
		SRC_DIR + '/components/**/*.css'
		])
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(concat('styles.min.css'))
		.pipe(autoprefixer('last 10 version'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(SRC_DIR + '/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('dev', ['sass', 'full-js', 'browser-sync'], () => {
	gulp.watch([SRC_DIR + '/components/**/*.sass', SRC_DIR + '/components/**/**/*.sass', SRC_DIR + '/components/**/*.css'], ['sass']);
	gulp.watch([SRC_DIR + '/components/**/*.js', SRC_DIR + '/components/**/**/*.js'], ['full-js']);
	gulp.watch(SRC_DIR + '/*.html', browserSync.reload);
});

gulp.task('default', ['dev']);