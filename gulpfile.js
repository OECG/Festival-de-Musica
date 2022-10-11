const {src,dest,watch, parallel} = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript
const terser = require('gulp-terser-js')

function css(done) {
    src("src/scss/**/*.scss")        // Identificar el archiv de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())                // Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )     
        .pipe(sourcemaps.write('.'))           
        .pipe(dest("build/css"))    // Almacenarla en el disco duro
    done();  // Callback que avisa a Gulp que llegamos al final
}

function imagenes(done) {
    const op = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(op) ) )
        .pipe( dest('build/img') )
    done();
}

function versionWebp(done) {
    const op = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(op) )
        .pipe( dest('build/img') )
    done();
}
function versionAvif(done) {
    const op = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(op) )
        .pipe( dest('build/img') )
    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())    
        .pipe( terser() )
        .pipe(sourcemaps.write('.'))  
        .pipe( dest('build/js') );
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascript);
    done();
}

// exports.'identificador' = function;
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, css, javascript, dev);