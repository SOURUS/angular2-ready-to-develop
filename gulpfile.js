const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    tsc = require('gulp-typescript'),
    config = require('./gulp.config')(),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    tsProject =tsc.createProject('./tsconfig.json'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css');

gulp.task('icons', function() {
    return gulp.src(config.fontawesomeDir)
        .pipe(gulp.dest(config.fontsOutPath));
});

gulp.task('compile-ts', function(){
    let sourceTsFiles = [
        config.allTs,
    ];

    let tsResult = gulp
        .src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));        
});

gulp.task('compile-scss', function () {
    return gulp.src(config.allScss)
        .pipe(sass(config.scssOptions))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.scssOutputPath))
});

gulp.task('css-stuff', ['compile-scss'], function () {
    return gulp.src(config.mainCss)
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.scssOutputPath))
});

gulp.task('serve', ['icons', 'compile-ts', 'css-stuff'], function(){
    browserSync.init({
        port:3000,
        file:['./index.html', '**/*.js', '**/*.css'],
        injectChanges: true,
        logFileChanges: false,
        logLevel: 'silent',
        notify: true,
        reloadDelay: 1000,
        server:{
            baseDir:'./'
        }
    });

    gulp.watch([config.allScss], ['compile-scss','css-stuff']).on('change', browserSync.reload);
    gulp.watch([config.allTs], ['compile-ts']).on('change', browserSync.reload);
    gulp.watch("index.html").on('change', browserSync.reload);    
});

gulp.task('default', ['serve']);