'use strict';

/*=============================================
==========   REQUIRE PACKAGES   ===============
=============================================*/
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();
const del = require('del');


/*=============================================
===============   CONFIG   ====================
=============================================*/
const config = {
    'server': './dist',
    templates: {
        input: 'src/templates/*.ejs',
        output: 'dist/'
    },
    sass: {
        input: 'src/sass/*.scss',
        output: 'dist/assets/css/'
    },
    scripts: {
        input: 'src/js/*.js',
        output: 'dist/assets/js/'
    },
    img: {
        input: 'src/img/**/*',
        output: 'dist/assets/img/'
    },
    fonts: {
        input: 'src/fonts/**/*',
        output: 'dist/assets/fonts/'
    }
};


/*=============================================
==============   GULP TASKS   =================
=============================================*/
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: config.server
        }
    });
});

gulp.task('clean', () => 
    del([
        'dist/assets/**/*'
    ])
);

gulp.task('ejs', () => 
    gulp.src(config.templates.input)
        .pipe(ejs({}, {}, {ext: '.html'}))
        .pipe(gulp.dest(config.templates.output))
        .on('end', browserSync.reload)
);

gulp.task('sass', () => 
    gulp.src(config.sass.input)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(rename({suffix : '.min'}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: 'sassda problem cixdi'
        }))
        .pipe(gulp.dest(config.sass.output))
        .pipe(browserSync.reload({stream:true}))
);

gulp.task('scripts', () => 
    gulp.src(config.scripts.input)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.scripts.output))
        .on('end', browserSync.reload)
);

gulp.task('images', () =>
    gulp.src(config.img.input)
        .pipe(imagemin())
        .pipe(gulp.dest(config.img.output))
);

gulp.task('fonts', () => 
    gulp.src(config.fonts.input)
        .pipe(gulp.dest(config.fonts.output))
);


/*=============================================
==============   GULP WATCH   =================
=============================================*/
gulp.task('watch', () => {
    gulp.watch('src/templates/**/*.ejs', gulp.series('ejs'));
    gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('src/img/**/*', gulp.series('images'));
    gulp.watch('src/fonts/**/*', gulp.series('fonts'));
});


/*=============================================
==============   GULP DEFAULT   ===============
// =============================================*/
gulp.task('default', gulp.series(
    ['clean'],
    gulp.parallel('ejs', 'sass', 'scripts', 'images', 'fonts'),
    gulp.parallel('watch', 'serve')
));