'use strict';

//npm install package_name --save-dev
var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del'),
  minify = require('gulp-clean-css');

gulp.task("concatScripts", function(){
    return gulp.src(['js/foundation.min.js','js/main.js'])
    .pipe(maps.init())
    .pipe(concat("app.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function(){
    return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest("js"));
});

gulp.task("compileSass", function(){
   return gulp.src("sass/application.scss")
   .pipe(maps.init())
   .pipe(sass())
   .pipe(maps.write("./"))
   .pipe(gulp.dest("css"));
});

gulp.task("minifyCss", ["compileSass"], function(){
    return gulp.src("css/application.css")
    .pipe(minify())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest("css"));
});


gulp.task('watch', function(){
    gulp.watch("sass/application.scss", ['minifyCss']);
    gulp.watch("js/main.js", ['minifyScripts']);
});

gulp.task('clean', function(){
  del('dist', 'css/application.css*', 'js/app*.js*');
});

gulp.task("build", ["minifyScripts", "compileSass"],function(){
    return gulp.src(["css/application.css", "js/app.min.js", "index.html"]
    , { base: './' })
    .pipe(gulp.dest('dist'));
});


//Dev Task
gulp.task('serve', ['watchFiles']);
//Final Task
gulp.task("default", ["clean"], function(){
    gulp.start('build');
});
