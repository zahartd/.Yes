var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass');
var pug            = require('gulp-pug');
var autoprefixer   = require('gulp-autoprefixer');
var concatCSS      = require('gulp-concat-css');
var concat         = require('gulp-concat');
var cleanCSS       = require('gulp-clean-css');
var csscomb        = require('gulp-csscomb');
var rename         = require("gulp-rename");
var uglify         = require('gulp-uglify');
var autopolyfiller = require('gulp-autopolyfiller');
var htmlbeautify   = require('gulp-html-beautify');
var uncss          = require('gulp-uncss');
var sourcemaps     = require('gulp-sourcemaps');
var plumber        = require('gulp-plumber');
var imagemin       = require('gulp-imagemin');
var notify         = require("gulp-notify");
var htmlmin        = require('gulp-htmlmin');
var rev            = require('gulp-rev');
var ftp            = require('gulp-ftp');
gulp.task('serve', ['sass','pug'], function() {
    browserSync.init({
        server: "src/"
    });
    gulp.watch("src/pug/*.pug", ['pug']);
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/css/*.css").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        	browsers: ['last 2 versions'],
        	cascade: false
        }))
        .pipe(concatCSS("style.css"))
        .pipe(csscomb())
        .pipe(plumber())
        .pipe(gulp.dest("src/css"))
        .pipe(sourcemaps.write())
        .pipe(browserSync.stream());
});
gulp.task('pug', function() {
    var options = {
        indentSize: 2,
        unformatted: [
             'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
            'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
            'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
             'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
        ]
    };
  return gulp.src("src/pug/index.pug")
        .pipe(plumber())
        .pipe(pug())
        .pipe(concat('index.html'))
        .pipe(htmlbeautify(options))
        .pipe(gulp.dest("src/"))
        .pipe(browserSync.stream());
});
gulp.task('minhtml', function() {
    return gulp.src("src/")
        .pipe(rev())
        .pipe(htmlmin({
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true
            }))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("dist/"))
        .pipe(notify('Html минимизирован'));
})
gulp.task('mincss', function() {
    return gulp.src("src/css/*.css")
        .pipe(rev())
        .pipe(rename({suffix: ".min"}))
        .pipe(cleanCSS())
        .pipe(plumber())
        .pipe(gulp.dest("dist/css"))
        .pipe(notify('Css минимизирован'));
})
gulp.task('minjs', function() {
    return gulp.src("src/js/*.js")
        .pipe(autopolyfiller('src/js/main.js'))
        .pipe(rev())
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(plumber())
        .pipe(gulp.dest("dist/js"))
        .pipe(notify('Javascript минимизирован'));
})
gulp.task('minimg', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(plumber())
        .pipe(gulp.dest("dist/img"))
        .pipe(notify('Изображения минимизированы'));
})
gulp.task('ftp', function(){
	return gulp.src('src/**')
	.pipe(ftp({
            host: 'shared-25.smartape.ru',
            user: 'user115649',
            pass: '2GXViX98dkck',
            remotePath: 'wwww/s115649.smrtp.ru'
        }))
});
gulp.task('default', ['serve']);
gulp.task('min',['minhtml', 'mincss', 'minjs', 'minimg']);