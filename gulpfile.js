var gulp=require('gulp');
var less=require('gulp-less');
var pump=require('pump');
var imagemin=require('gulp-imagemin');
var rename=require('gulp-rename');
var uglify=require('gulp-uglify');
var watch=require('gulp-watch');
var connect=require('gulp-connect');
var open=require('open');
var ts=require("gulp-typescript");
var tsProject=ts.createProject("tsconfig.json");
var revContent=require("gulp-rev");
var revCollector=require("gulp-rev-collector");
var runPath={
    srcPath:'src/',
    prdPath:'dist/',
    devPath:'build/'
};
gulp.task('style',function (cb) {
    pump([
        gulp.src(runPath.srcPath+'style/*.less'),
        less(),
        gulp.dest(runPath.prdPath+'style'),
        gulp.dest(runPath.devPath+'style'),
        connect.reload()
    ],cb);
});
gulp.task('watch',function () {
    gulp.watch(runPath.srcPath+'**/*.html',gulp.series('html'));
    gulp.watch(runPath.srcPath+'style/*.less',gulp.series('style'));
    gulp.watch(runPath.srcPath+'js/*.js',gulp.series('js'));
    gulp.watch(runPath.srcPath+'image/*.{png,jpg,gif,ico,jpeg}',gulp.series('image'));
    gulp.watch(runPath.srcPath+"ts/*.ts",gulp.series('ts'));
});
gulp.task('connect',function () {
    connect.server({
        root:[runPath.devPath],
        livereload: true,
        port: 3000
    });
    open('http://localhost:3000');
});
gulp.task('image',function (cb) {
    pump([
        gulp.src(runPath.srcPath+'image/*.{png,jpg,gif,ico,jpeg}'),
        gulp.dest(runPath.devPath+'image'),
        gulp.dest(runPath.prdPath+'image'),
        connect.reload()
    ],cb)
})
gulp.task('html',function (cb) {
    pump([
        gulp.src(runPath.srcPath+'**/*.html'),
        gulp.dest(runPath.prdPath),
        gulp.dest(runPath.devPath),
        connect.reload()
    ],cb)
});
gulp.task('js',function (cb) {
    pump([
        gulp.src(runPath.srcPath+'js/*.js'),
        uglify(),
        gulp.dest(runPath.prdPath+"js"),
        gulp.dest(runPath.devPath+'js'),
        connect.reload()
    ],cb);
});
gulp.task("ts",function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(runPath.devPath+"js"))
        .pipe(gulp.dest(runPath.prdPath+"js"));
});
gulp.task("clean",function () {
    return gulp.src(runPath.devPath,{read:false}).pipe(clean());
})
gulp.task('default',gulp.series(gulp.parallel('connect','watch','html','style','js','image')));
