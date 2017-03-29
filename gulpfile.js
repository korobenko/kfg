'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    argv = require('yargs').argv;

var rootDir = './';

if ( argv.invoice ) {
    rootDir = './invoice/';
}

if ( argv.proposal ) {
    rootDir = './proposal/';
}

var css = [
    rootDir + 'css/partials/normalize.css',
    rootDir + 'css/partials/style.css'
];

var path = {
    build: {
        sass: rootDir + 'css/partials/',
        css: rootDir + 'build/css/'
    },
    src: {
        sass: rootDir + 'sass/partials/*.scss',
        css: css,
    },
    watch: {
        sass: rootDir + 'sass/partials/*.scss',
        css: css
    }
};

gulp.task('sass:build', function () {
    return gulp.src(path.src.sass)
        .pipe(sass( { errLogToConsole: false } ))
        .on('error', notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Error running something'
        }))
        .pipe(gulp.dest(path.build.sass));
});

gulp.task('css:build', function () {
    return gulp.src(path.src.css)
        .pipe(concat('bundle.css'))
        .on('error', notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Error running something'
        }))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('watch', function () {
    gulp.watch(path.watch.sass, ['sass:build']);
    gulp.watch(path.watch.css, ['css:build']);
});

gulp.task('build', [
    'sass:build',
    'css:build',
    'watch'
]);
