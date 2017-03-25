'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify');

var rootDirInvoice = './invoice/';

var cssInvoice = [
    rootDirInvoice + 'css/normalize.css',
    rootDirInvoice + 'css/style.css'
];

var path = {
    invoice: {
        build: {
            sass: rootDirInvoice + 'css/',
            css: rootDirInvoice + 'build/css/'
        },
        src: {
            sass: rootDirInvoice + 'sass/*.scss',
            css: cssInvoice,
        },
        watch: {
            sass: rootDirInvoice + 'sass/*.scss',
            css: cssInvoice
        }
    }
};

gulp.task('sass:build:invoice', function () {
    return gulp.src(path.invoice.src.sass)
        .pipe(sass( { errLogToConsole: false } ))
        .on('error', notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Error running something'
        }))
        .pipe(gulp.dest(path.invoice.build.sass));
});

gulp.task('css:build:invoice', function () {
    return gulp.src(path.invoice.src.css)
        .pipe(concat('bundle.css'))
        .on('error', notify.onError({
            message: 'Error: <%= error.message %>',
            title: 'Error running something'
        }))
        .pipe(gulp.dest(path.invoice.build.css));
});

gulp.task('watch:invoice', function () {
    gulp.watch(path.invoice.watch.sass, ['sass:build:invoice']);
    gulp.watch(path.invoice.watch.css, ['css:build:invoice']);
});

gulp.task('build:invoice', [
    'sass:build:invoice',
    'css:build:invoice',
    'watch:invoice'
]);
