var gulp = require("gulp");
var imagemin = require("gulp-imagemin")
var htmlclean = require("gulp-htmlclean");
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var deporder = require("gulp-deporder");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");



var folder = {
    dist: "dist/",
    src: "src/"
}


var devMode = process.env.NODE_ENV !== "production";
console.log(devMode)
// task running   流操作（文件以文件流的形式被操作）

gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload());
    if (!devMode) {
        page.pipe(htmlclean());
    }
    page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("images", function () {
    gulp.src(folder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist + "images/"))
})

gulp.task("js", function () {
    var js = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());
    if (!devMode) {
        js.pipe(uglify())
            .pipe(stripDebug())
    }
    js.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("css", function () {
    var options = [autoprefixer(),cssnano()];
    var page = gulp.src(folder.src + "css/*")
        .pipe(less())
        .pipe(connect.reload());
    if (!devMode) {
      
       page.pipe(postcss(options))
    }

    page.pipe(gulp.dest(folder.dist + "css/"))
})


gulp.task("server",function(){
    connect.server({
        port:"8090",
        livereload:true

    });
})


gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"]);
    gulp.watch(folder.src + "css/*",["css"]);
    gulp.watch(folder.src + "js/*",["js"]);
    gulp.watch(folder.src + "images/*",["images"]);

})

gulp.task("default",["html","css","js","images","watch","server"]);