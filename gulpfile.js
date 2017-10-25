/**
 * Created by Administrator on 2017-10-25.0025.
 */
var gulp = require("gulp");
/*var minifyHtml= require("gulp-minify-html");*/
var $ = require("gulp-load-plugins")();

//新建任务复制html
gulp.task('html',function () {
    gulp.src('src/*.html')//读取文件
        .pipe(gulp.dest('build/'))//复制文件到开发环境
        .pipe($.minifyHtml())//压缩html
        .pipe(gulp.dest('min/'))//复制文件到开发环境
});
//新建任务，复制CSS
gulp.task('css',function () {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('build/'))
        .pipe($.cssmin())
        .pipe(gulp.dest('min/'))
});

//删除文件
gulp.task("clean",function () {
    gulp.src(["build/","min/"])
        .pipe($.clean())
});
gulp.task("default", ['css', 'html']);