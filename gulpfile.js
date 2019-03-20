'use strict';

/*=============================================
==========   REQUIRE PACKAGES   ===============
=============================================*/
const gulp = require('gulp');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
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
    server: './dist',
    templates: {
        input: 'src/templates/*.ejs',
        output: 'dist/'
    },
    vendors: {
        jquery: {
            input: 'node_modules/jquery/dist/jquery.min.js',
            output: 'dist/assets/vendors/jquery/'
        },
        popper: {
            input: 'node_modules/popper.js/dist/umd/popper.min.js',
            output: 'dist/assets/vendors/popper.js/'
        },
        bootstrap: {
            js: {
                input: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                output: 'dist/assets/vendors/bootstrap/js/'
            },
            css: {
                input: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
                output: 'dist/assets/vendors/bootstrap/css/'
            }
        },
        font_awesome: {
            css: {
                input: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
                output: 'dist/assets/vendors/fontawesome/css/'
            },
            fonts: {
                input: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
                output: 'dist/assets/vendors/fontawesome/webfonts/'
            }
        }
    },
    sourcemaps: {
        css: '../maps/css',
        js: '../maps/js'
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
    del(['dist/assets/**/*'])
);

gulp.task('vendors:fonts', () => 
    gulp.src(config.vendors.font_awesome.fonts.input).pipe(gulp.dest(config.vendors.font_awesome.fonts.output))
);
gulp.task('vendors:css', () => {
    const bootstrap_css = gulp.src(config.vendors.bootstrap.css.input).pipe(gulp.dest(config.vendors.bootstrap.css.output));
    const font_awesome_css = gulp.src(config.vendors.font_awesome.css.input).pipe(gulp.dest(config.vendors.font_awesome.css.output))

    return Promise.all([bootstrap_css, font_awesome_css]);
});
gulp.task('vendors:js', () => {
    const jquery_js = gulp.src(config.vendors.jquery.input).pipe(gulp.dest(config.vendors.jquery.output));
    const popper_js = gulp.src(config.vendors.popper.input).pipe(gulp.dest(config.vendors.popper.output));
    const bootstrap_js = gulp.src(config.vendors.bootstrap.js.input).pipe(gulp.dest(config.vendors.bootstrap.js.output));

    return Promise.all([jquery_js, popper_js, bootstrap_js]);
});
gulp.task('vendors', gulp.parallel('vendors:fonts', 'vendors:css', 'vendors:js'));

gulp.task('ejs', () => 
    gulp.src(config.templates.input)
        .pipe(ejs({}, {}, {ext: '.html'}))
        .pipe(gulp.dest(config.templates.output))
        .on('end', browserSync.reload)
);

gulp.task('sass', () => 
    gulp.src(config.sass.input)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(rename({suffix : '.min'}))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: 'There is an error on sass file'
        }))
        .pipe(sourcemaps.write(config.sourcemaps.css))
        .pipe(gulp.dest(config.sass.output))
        .pipe(browserSync.reload({stream:true}))
);

gulp.task('scripts', () => 
    gulp.src(config.scripts.input)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(config.sourcemaps.js))
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


/*===============================================
==============   GULP DEFAULT   =================
// =============================================*/
gulp.task('default', gulp.series(
    ['clean'],
    gulp.parallel('vendors', 'ejs', 'sass', 'scripts', 'images', 'fonts'),
    gulp.parallel('watch', 'serve')
));