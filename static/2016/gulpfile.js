var gulp = require('gulp'),
		sass = require('gulp-ruby-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cssnano = require('gulp-cssnano'),
		sourcemaps = require('gulp-sourcemaps'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
		rename = require('gulp-rename'),
		concat = require('gulp-concat'),
		notify = require('gulp-notify'),
		cache = require('gulp-cache'),
		livereload = require('gulp-livereload'),
		del = require('del'),
		svgSprite = require('gulp-svg-sprite'),
		imageminJpegRecompress = require('imagemin-jpeg-recompress');

config = {
	mode : {
		symbol : true
	},
	svg : {
		xmlDeclaration : false,
		doctypeDeclaration: false,
		namespaceClassnames: true,
		rootAttributes : {
			style : 'display:none;'
		}
	}
};

gulp.task('styles', function() {
  
  return sass('source/scss/style.scss', {
    sourcemap: false,
    style: 'expanded'
  })
  .on('error', sass.logError)
  //.pipe(sourcemaps.init())
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('css'))
	.pipe(rename({suffix: ''}))
	.pipe(cssnano())
	//.pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('css'))
  .pipe(notify({ message: 'Styles task complete' }));
  
	//return sass('source/scss/style.scss', { style: 'expanded' })
	//.pipe(sourcemaps.init())
	//.pipe(sourcemaps.write('.'))
					
});

gulp.task('svgsprite', function() {
	return gulp.src('source/svg/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('build/svg'))
		.pipe(notify({ message: 'SVGsprite task complete' }));
});

gulp.task('scripts', function() {
	return gulp.src([
	  './source/js/jquery.easings.min.js',
  	'./source/js/jquery.carouFredSel-6.2.1.js',
  	'./source/js/jquery.divscroll.js',
  	'./source/js/skrollr.js',
  	//'./source/js/jquery.parallax-scroll.js',
  	//'./source/js/polyfill.object-fit.core.js',
  	'./source/js/foundation.js',
  	'./source/js/foundation.offcanvas.js',
  	'./source/js/jquery.maskedinput.min.js',
  	'./source/js/mobile-detect.js',
	  './source/js/application.js',
	])
	//.pipe(jshint(''))
	//.pipe(jshint.reporter('default'))
	.pipe(concat('js/application.js'))
	.pipe(gulp.dest(''))
	.pipe(rename({suffix: ''}))
	.pipe(uglify())
	.pipe(gulp.dest(''))
	.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
	return gulp.src('source/images/**/*.png')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('imagesjpg', function() {
	return gulp.src('source/images/**/*.jpg')
		.pipe(imagemin({},{},{plugins: [
        imageminJpegRecompress({
          progressive: true
        })
    ]}))
		.pipe(gulp.dest('build/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('jpg', function() {
	return gulp.src('source/images/**/*')
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('build/images'))
		.pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
		return del(['js', 'images', 'svg']);
});

gulp.task('default', ['clean'], function() {
		gulp.start('styles', 'scripts', 'images', 'svgsprite');
});

gulp.task('watch', function() {

	gulp.watch('source/scss/**/*.scss', ['styles']);

	gulp.watch('source/js/**/*.js', ['scripts']);

	//gulp.watch('source/images/**/*', ['images']);

	gulp.watch('source/svg/**/*', ['svgsprite']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['css/**/*.css','js/**/*.js','**/*.html']).on('change', livereload.changed);

});