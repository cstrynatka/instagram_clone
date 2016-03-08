var gulp = require('gulp');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var recess = require('gulp-recess');
var header = require('gulp-header');
var gulpFilter = require('gulp-filter');
var complexity = require('gulp-complexity');
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');

var banner = ['/**',
    ' * Instagram Demo',
    ' * (c) 2014 Author Name',
    ' * License: MIT',
    ' * Last Updated: <%= new Date().toUTCString() %>',
    ' */',
    ''].join('\n');

gulp.task('minify', function() {
    var templatesFilter = gulpFilter('clients/views/*.html');

    return gulp.src([
        'client/vendor/angular.js',
        'client/vendor/*.js',
        'client/app.js',
        'client/templates.js',
        'client/controllers/*.js',
        'client/services/*.js',
        'client/directives/*.js'
    ])
        .pipe(templatesFilter)
        .pipe(templateCache({ root: 'views', module: 'Instagram' }))
        .pipe(templatesFilter.restore())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(gulp.dest('client'));
});