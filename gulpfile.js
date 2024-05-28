var gulp = require('gulp');

var concat = require('gulp-concat'); // Gọp nhiều file thành 1 file
var concatCss = require('gulp-concat-css'); // Gọp nhiều file thành 1 file css

var cleanCSS = require('gulp-clean-css'); // Minify Css
var uglify = require('gulp-uglify'); // Minify JavaScript

var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber'); // Bắt lỗi khi đang build
var sourcemaps = require('gulp-sourcemaps'); // Cho biết nguồn css
var rename = require("gulp-rename"); // Đổi tên file

// Nén hình
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var ggf = require('gulp-google-fonts');

var FRONTEND_PATH = 'public_html/template/frontend'; // Đường dẫn thư mục frontend

// Đường dẫn css,js src
var CSS_PATH = FRONTEND_PATH + '/src/css';
var SCRIPTS_PATH = FRONTEND_PATH + '/src/js';

// Đường dẫn dist
var DIST_PATH = FRONTEND_PATH + '/dist';

//gulp css-global
gulp.task('css-global', function() {
    return  gulp.src([CSS_PATH + '/g-*.css'])
                .pipe(plumber())
                .pipe(autoprefixer())
                .pipe(concat('global.css'))
                .pipe(cleanCSS({level: {1: {specialComments: 0}}})) // Chú ý @import phải để đầu tiên
                .pipe(gulp.dest(DIST_PATH + '/css'));
});
//gulp css-page
gulp.task('css-page', function() {
    return  gulp.src([CSS_PATH + '/page_*.css'])
                .pipe(plumber())
                .pipe(autoprefixer())
                .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
                .pipe(rename(function (path) {
                    path.extname = ".css";
                }))
                .pipe(gulp.dest(DIST_PATH + '/css'));
});
//gulp css-vendor
gulp.task('css-vendor', function() {
    return  gulp.src([CSS_PATH + '/v_*.css'])
                .pipe(plumber())
                .pipe(autoprefixer())
                .pipe(cleanCSS({level: {1: {specialComments: 0}}}))
                .pipe(rename(function (path) {
                    path.extname = ".css";
                }))
                .pipe(gulp.dest(DIST_PATH + '/css'));
});
// gulp css
gulp.task('css', ['css-global','css-page','css-vendor'],function() {
    console.log('===== Starting css task =====');
});

// gulp js-global
gulp.task('js-global', function() {
    return  gulp.src([SCRIPTS_PATH + '/g-*.js'])
                .pipe(plumber())
                .pipe(concat('global.js'))
                .pipe(uglify())
                .pipe(gulp.dest(DIST_PATH + '/js'));
});
// gulp js-page
gulp.task('js-page', function() {
    return  gulp.src([SCRIPTS_PATH + '/page_*.js'])
                .pipe(plumber())
                .pipe(uglify())
                .pipe(rename(function (path) {
                    path.extname = ".js";
                }))
                .pipe(gulp.dest(DIST_PATH + '/js'));
});
// gulp js-vendor
gulp.task('js-vendor', function() {
    return  gulp.src([SCRIPTS_PATH + '/v_*.js'])
                .pipe(plumber())
                .pipe(uglify())
                .pipe(rename(function (path) {
                    path.extname = ".js";
                }))
                .pipe(gulp.dest(DIST_PATH + '/js'));
});
// gulp js
gulp.task('js', ['js-global','js-page','js-vendor'],function() {
    console.log('===== Starting js task =====');
});

// gulp img-static
gulp.task('img-static', function() {
    console.log('===== Starting img-static task =====');
    gulp.src('public_html/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest('public_html/images-static'));
});
// gulp img-upload
gulp.task('img-upload', function() {
    console.log('===== Starting img-upload task =====');
    gulp.src('public_html/uploads/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest('public_html/uploads/images-upload'));
});
// gulp img-detail
gulp.task('img-detail', function() {
    console.log('===== Starting img-detail task =====');
    gulp.src('public_html/uploads/details/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest('public_html/uploads/details-upload'));
});
// gulp img
gulp.task('img', ['img-static','img-upload','img-detail'],function() {
    console.log('===== Starting img task =====');
});

// gulp style
gulp.task('style', ['css','js'],function() {
    console.log('===== Starting style (css,js) task =====');
});